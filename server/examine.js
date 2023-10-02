examine={
    getNew:async function(req, res){
        if(!login.logined[req.cookies.sessionId]){
            return res.json({code:1,msg:"身份无效"});
        }
        try{
            var result = await dataBase.query("SELECT * FROM examine WHERE schoolid = "+login.logined[req.cookies.sessionId]['schoolid']+" AND result = 0 order by id desc");
        }catch(er){
            console.log(er);
            return res.json({code:2,msg:"请按要求填写内容"});
        }
        //添加信息
        for(key in result){
            if(result[key]['type']=='user'){
                result[key]['targetName']=await dataBase.get('user','username','id = '+result[key]['targetid']);
                result[key]['time']=FnewDate(parseInt(result[key]['timestamp']));
                let phone = await dataBase.get('user','phone','id = '+result[key]['targetid']);
                result[key]['phone'] = phone.slice(0,4)+"****"+phone.slice(8,11);
            }else if(result[key]['type']=='pc'){
                result[key]['targetName']='多媒体'
                result[key]['phone'] = 'id:'+result[key]['targetid'];
                result[key]['time']=FnewDate(parseInt(result[key]['timestamp']));
            }
        }
        return res.json({code:0,data:result});
    },
    sendResult:async function(req, res){
        if(!login.logined[req.cookies.sessionId]){
            return res.json({code:1,msg:"身份无效"});
        }
        try{
            var result = await dataBase.query(`UPDATE examine SET result = ${req.body.result},sourceid = ${login.logined[req.cookies.sessionId]['id']} WHERE id = ${req.body.id}`);
        }catch(er){
            console.log(er);
            return res.json({code:2,msg:"请按要求填写内容"});
        }
        try{
            var result_2 = await dataBase.query(`UPDATE computer SET pass = ${req.body.result} WHERE id = ${req.body.targetid}`);
        }catch(er){
            console.log(er);
            return res.json({code:2,msg:"请按要求填写内容"});
        }
        console.log(result);
        //发送到多媒体
        if(req.body.result=='1'){
            if(computer.templogin[req.body.targetid]){
                computer.templogin[req.body.targetid]["reply"]({callback:"pass",msg:"you are passing!"});
                delete computer.templogin[req.body.targetid];
            }
        }
        //发送到管理员
        login.logined[req.cookies.sessionId]['reply']({callback:"refalsh_computer"});
        return res.json({code:0,msg:"成功"});
    },
    showMoreMsg:async function(req, res){
        if(!login.logined[req.cookies.sessionId]){
            return res.json({code:1,msg:"身份无效"});
        }
        try{
            var result = await dataBase.query("SELECT * FROM examine WHERE schoolid = "+login.logined[req.cookies.sessionId]['schoolid']+" order by id desc");
        }catch(er){
            console.log(er);
            return res.json({code:2,msg:"请按要求填写内容"});
        }
        //添加信息
        for(key in result){
            if(result[key]['type']=='user'){
                result[key]['targetName']=await dataBase.get('user','username','id = '+result[key]['targetid']);
                if(result[key]['sourceid']!=0){
                    result[key]['sourceName']=await dataBase.get('user','username','id='+result[key]['sourceid']);
                }
                result[key]['time']=FnewDate(parseInt(result[key]['timestamp']));
                let phone = await dataBase.get('user','phone','id = '+result[key]['targetid']);
                result[key]['phone'] = phone.slice(0,4)+"****"+phone.slice(8,11);
            }else if(result[key]['type']=='pc'){
                result[key]['targetName']='多媒体';
                if(result[key]['sourceid']!=0){
                    result[key]['sourceName']=await dataBase.get('user','username','id='+result[key]['sourceid']);
                }
                result[key]['phone'] = 'id:'+result[key]['targetid'];
                result[key]['time']=FnewDate(parseInt(result[key]['timestamp']));
            }
        }
        return res.json({code:0,data:result});
    }
}