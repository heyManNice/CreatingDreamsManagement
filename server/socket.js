const WebSocket = require('ws')
const fs = require("fs");

const wss =new WebSocket.Server({
    port:3500
})
function randomString(e) {    
    e = e || 32;
    var t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",
    a = t.length,
    n = "";
    for (i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
    return n
}

wss.on('connection',function(ws){
    print("socket连接");
    //回复消息函数
    ws.reply=function(msg){
        msg=JSON.stringify(msg);
        ws.send(msg,(err)=>{
            if(err){
                print(err);
            }
        })
    }
    //收到消息
    ws.on('message',async function(message){
        message=JSON.parse(message);
        console.log(message);
        //身份验证
        if(!ws.key){
            if(!message.key){
                ws.reply({msg:"error"});
                ws.close();
                return
            }
            if(message.key=='undefined'&&message.from=="PC"){
                console.log("注册");
                if(!message.data){
                    ws.reply({msg:"error"});
                    ws.close();
                    return
                }
                let mymd5 = login.pw_md5(JSON.stringify(message.data));
                let schoolid = await dataBase.get('school','id','name = "'+message.data.schoolName+'"');
                let ins = await dataBase.query(`INSERT INTO computer (\`key\`,schoolid,class) VALUES ("${mymd5}", "${schoolid}",'${JSON.stringify(message.data.class)}');`);
                let comId = await dataBase.get('computer','id','\`key\` = "'+mymd5+'"');
                let exam = await dataBase.query(`INSERT INTO examine (type,targetid,content,schoolid,timestamp) VALUES ("pc", "${comId}","正在注册为${message.data.class.grade}年级${message.data.class.class}班多媒体", "${schoolid}","${new Date().getTime()}");`);
                //临时登记
                computer.templogin[comId]={};
                computer.templogin[comId]["reply"]=ws.reply;
                //广播到管理员
                for(i in login.logined){
                    if(login.logined[i]["online"]==1 && login.logined[i]["schoolid"]==schoolid){
                        login.logined[i].reply({callback:"refalsh_examine"});
                    }
                }
                ws.reply({callback:'registerOK',msg:"ok",yourKey:mymd5,yourId:comId});
                await dataBase.query(`INSERT INTO log (timestamp,schoolid,type,compurterid,content) VALUES ("${new Date().getTime()}", "${schoolid}","正常","${comId}","多媒体注册");`);
                return
            }
            if(message.from=="PC"){
                try{
                    var pw = await dataBase.query("SELECT * FROM computer WHERE `key` = '"+message.key+"'");
                }catch(er){
                    console.log(er);
                    ws.reply({msg:"error"});
                    ws.close();
                    return
                }
                pw=pw[0]
                console.log(pw);
                if(!pw||pw.key!=message.key){
                    ws.reply({msg:"error"});
                    ws.close();
                    return
                }
                if(pw.pass==0){
                    ws.reply({callback:"nopass",msg:"you are not pass"});
                    computer.templogin[pw.id]={};
                    computer.templogin[pw.id]["reply"]=ws.reply;
                    return
                }
                computer.logined[message.key]=pw;
                computer.logined[message.key]["reply"]=ws.reply;
                //await dataBase.query(`INSERT INTO log (timestamp,schoolid,type,compurterid,content) VALUES ("${new Date().getTime()}", "${pw.schoolid}","正常","${pw.id}","多媒体开机");`);
                for(i in login.logined){
                    if(login.logined[i]["online"]==1 && login.logined[i]["schoolid"]==computer.logined[message.key]["schoolid"]){
                        login.logined[i].reply({callback:"computerOnOff",id:computer.logined[message.key]['id'],onOff:1});
                    }
                }
                ws.key=message.key;
                ws.form="PC";
            }else{
                if(!login.logined[message.key]){
                    ws.reply({msg:"error"});
                    ws.close();
                    return
                }
                login.logined[message.key]["reply"]=ws.reply;
                login.logined[message.key]["online"]=1;
                ws.form=='user'
                ws.key=message.key;
            }
        }
        if(message.type=="toPC"){
            console.log("向电脑");
            for(i in computer.logined){
                if(computer.logined[i]['id']==message.id){
                    computer.logined[i].reply(message);
                }
            }
        }
        if(message.type=="getSc"){
            for(i in computer.logined){
                if(message.id){
                    if(computer.logined[i]['id']==message.id){
                        computer.logined[i]['reply']({callback:"getSc"});
                    }
                }else{
                    if(computer.logined[i]['schoolid']==login.logined[ws.key]['schoolid']){
                        computer.logined[i]['reply']({callback:"getSc"});
                    }
                }
            }
        }
        if(message.type=="keywordsError"){
            await dataBase.set("log",`type="可疑"`,"id="+message.id);
        }
        if(message.type=="toAdmin"){
            for(i in login.logined){
                if(login.logined[i]["online"]==1 && login.logined[i]["schoolid"]==computer.logined[ws.key]["schoolid"]){
                    login.logined[i].reply(message);
                }
            }
        }
        if(message.type=="setWallpaper"){
            const base64 = message.base64_img.replace(/^data:image\/\w+;base64,/, "");
            let fileName=randomString(5)+new Date().getTime()+'.png';
            let fileUrl="./img/wallpaper/"+fileName;
            fs.writeFile(dirnameMain+"/public/img/wallpaper/"+fileName, base64, 'base64', async function (err) {
                if (err) {
                    console.log(err);
                }else{
                    await dataBase.set("computer",`wallpaper="${fileUrl}"`,message.em=='s'?"id="+message.id:"schoolid="+message.id);
                    ws.reply({callback:"setWallpaperOK",msg:"修改成功",fileUrl:fileUrl,id:message.id,new:1});
                    message.fileUrl=fileUrl;
                    delete message.base64_img;
                    message.callback="wallpaper";
                    for(i in computer.logined){
                        if(computer.logined[i]['id']==message.id || message.em=="a"){
                            computer.logined[i].reply(message);
                        }
                    }
                }
            });
           
        }
        if(message.type=="setWallpaper_url"){
            await dataBase.set("computer",`wallpaper="${message.fileUrl}"`,message.em=='s'?"id="+message.id:"schoolid="+message.id);
            ws.reply({callback:"setWallpaperOK",msg:"修改成功",fileUrl:message.fileUrl,id:message.id,type:message.em});
            message.callback="wallpaper";
            for(i in computer.logined){
                if(computer.logined[i]['id']==message.id || message.em=="a"){
                    computer.logined[i].reply(message);
                }
            }
        }
        ws.reply({msg:message});
    })
    ws.on('close',async function(){
        if(ws.form=='PC'){
            console.log("PC下线");
            for(i in login.logined){
                if(login.logined[i]["online"]==1 && login.logined[i]["schoolid"]==computer.logined[ws.key]["schoolid"]){
                    login.logined[i].reply({callback:"computerOnOff",id:computer.logined[ws.key]['id'],onOff:0});
                }
            }
            //await dataBase.query(`INSERT INTO log (timestamp,schoolid,type,compurterid,content) VALUES ("${new Date().getTime()}", "${computer.logined[ws.key].schoolid}","正常","${computer.logined[ws.key].id}","多媒体关机");`);
            delete computer.logined[ws.key];
        }else if(ws.form=='user'){
            console.log("用户下线");
            login.logined[ws.key]["online"]=0;
        }
    });
})