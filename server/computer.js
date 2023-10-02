computer={
    getAllComputer:async function(req, res){
        //允许空参数
        try{
            var result = await dataBase.query("SELECT * FROM computer WHERE schoolid = "+login.logined[req.cookies.sessionId]['schoolid']+" AND pass = 1");
        }catch(er){
            console.log(er);
            return res.json({code:2,msg:"请按要求填写内容",ms:3000});
        }
        for(i in result){
            if(computer.logined[result[i]['key']]){
                result[i]['state']=1;
            }else{
                result[i]['state']=0;
            }
        }
        return res.json({code:0,data:result});
    },
    logined:{
        
    },
    templogin:{

    }
}