notice={
    getNew:async function(req,res){
        //不校验身份
        try{
            var result = await dataBase.query("SELECT title,content,onOff FROM notice WHERE id = 1");
        }catch(er){
            console.log(er);
            return res.json({code:3,msg:"查询错误"});
        }
        return res.json({code:0,data:result[0]});
    }
}