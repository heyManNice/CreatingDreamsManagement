//第三方模块
const crypto = require('crypto');

//生成范围随机数
function randomNum(minNum,maxNum){ 
    switch(arguments.length){ 
        case 1: 
            return parseInt(Math.random()*minNum+1,10); 
            break; 
        case 2: 
            return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
            break; 
        default: 
            return 0; 
            break; 
    } 
} 
//后端登录注册api管理
login = {
    //登录验证
    login:async function(req, res){
        console.log(req.body);
        if(!req.body&&isEmpty(req.body)){
            return res.json({callback:["warn.show"],msg:"未知错误,请刷新网页重试.或者联系管理员",ms:3000});
        }
        if(!isSafe(req.body)){
            return res.json({callback:["warn.show"],msg:"非法字符",ms:3000});
        }
        try{
            var pw = await dataBase.query("SELECT id,username,phone,password,isAdmin,schoolid FROM user WHERE phone = "+req.body.phone);
        }catch(er){
            console.log(er);
            return res.json({callback:["warn.show"],msg:"请按要求填写内容",ms:3000});
        }
        pw=pw[0]
        let md5Password = login.pw_md5(req.body.password);
        if(!(pw&&req.body.phone==pw.phone&&md5Password==pw.password)){
            return res.json({callback:["warn.show"],msg:"手机号或者密码错误",ms:3000});
        }
        //SessionId应该设置有效期，此处为了方便调试
        let newSessionId = undefined;
        for(key in login.logined){
            if(pw.id==login.logined[key]['id']){
                newSessionId=key;
            }
        }
        if(!newSessionId){
            newSessionId = login.pw_md5(pw.phone+new Date().getTime());
        }
        res.cookie('sessionId',newSessionId, {
            maxAge: 1000 * 60 * 60 * 24 * 2,
            path: '/',
        });
        login.logined[newSessionId]=pw;
        console.log(login.logined);
        return res.json({callback:["switchUrl"],url:"/"});
    },
    //生成密码的md5
    pw_md5:function(password){
        let hash = crypto.createHash('md5');
        hash.update('987653abc');
        hash.update(password);
        return hash.digest('hex');
    },
    //验证码
    getVeri:async function(req, res){
        //!req.body已弃用，改为!Object.keys(req.body).length
        if(!req.body&&isEmpty(req.body)){
            return res.json({callback:["warn.show"],msg:"未知错误,请刷新网页重试.或者联系管理员",ms:3000});
        }
        if(login.phoneVeriCode[req.body.phone]){
            return res.json({callback:["warn.show","countDown"],msg:"获取过于频繁，请60秒后重试",ms:3000,start:60,end:0,em:'.phoneVeri',delclick:true});
        }
        let phone = await dataBase.query("SELECT phone FROM user WHERE phone = "+req.body.phone);
        if(phone[0]){
            return res.json({callback:["warn.show"],msg:"该手机号已经注册",ms:3000});
        }
        let Veri=randomNum(1000,9999)

        try{
            var sendVeri = await massage.send(Veri,req.body.phone);
        }catch(er){
            console.log(er);
            return  res.json({callback:["warn.show","countDown"],msg:"失败:"+er.message.split(',')[0],ms:3000,start:10,end:0,em:'.phoneVeri',delclick:true});
        }
        console.log("拿到了信息"+sendVeri);
        sendVeri=JSON.parse(sendVeri);
        if(sendVeri.Code!="OK"){
            return  res.json({callback:["warn.show","countDown"],msg:"未知错误，请联系管理员",ms:3000,start:10,end:0,em:'.phoneVeri',delclick:true});
        }
        //保存手机验证码
        login.phoneVeriCode[req.body.phone]=Veri;
        setTimeout(function(){
            delete login.phoneVeriCode[req.body.phone];
        },60000);
        console.log(login.phoneVeriCode);
        return res.json({callback:["warn.show","countDown"],msg:"验证码已发送",ms:3000,start:60,end:0,em:'.phoneVeri',delclick:true});
    },
    logined:{},
    phoneVeriCode:{},
    //注册
    register:async function(req, res){
        if(!req.body&&isEmpty(req.body)){
            return res.json({callback:["warn.show"],msg:"未知错误,请刷新网页重试.或者联系管理员",ms:3000});
        }
        if(!login.phoneVeriCode[req.body.phone]){
            return res.json({callback:["warn.show"],msg:"验证码已过期",ms:3000});
        }
        if(login.phoneVeriCode[req.body.phone]!=req.body.phoneVeriCode){
            return res.json({callback:["warn.show"],msg:"验证码错误",ms:3000});
        }
        //判断手机号是否注册
        let phone = await dataBase.query("SELECT phone FROM user WHERE phone = "+req.body.phone);
        if(phone[0]){
            return res.json({callback:["warn.show"],msg:"该手机号已经注册",ms:3000});
        }
        let md5Password = login.pw_md5(req.body.password_1);
        let ins = await dataBase.query(`INSERT INTO user (schoolid,username, phone, password) VALUES (${req.body.school}, "${req.body.username}", "${req.body.phone}", "${md5Password}");`);
        console.log(ins);
        req.body.password=req.body.password_1;
        await login.login(req, res);
        //return res.json({callback:["warn.show"],msg:"注册成功",ms:3000})
    }
}