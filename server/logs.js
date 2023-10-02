logs={
    getAllLogs:async function(req, res){
        if(!login.logined[req.cookies.sessionId]){
            return res.json({code:1,msg:"身份无效"});
        }
        try{
            var result = await dataBase.query("SELECT * FROM log WHERE schoolid = "+login.logined[req.cookies.sessionId]['schoolid']+" order by id desc");
        }catch(er){
            console.log(er);
            return res.json({code:2,msg:"请按要求填写内容"});
        }
        for(key in result){
            let myclass = JSON.parse(await dataBase.get('computer','class','id = '+result[key]['compurterid']));
            result[key]['class']=`${myclass.grade}年级${myclass.class}班`;
            result[key]['time']=FnewDate(parseInt(result[key]['timestamp']));
        }
        return res.json({code:0,data:result});
    }
}