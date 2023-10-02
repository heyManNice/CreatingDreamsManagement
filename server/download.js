const fs = require("fs");
download={
    getAllImage:async function(req, res){
        if(!login.logined[req.cookies.sessionId]){
            return res.json({code:1,msg:"身份无效",ms:3000});
        }
        try{
            var result = await dataBase.query("SELECT * FROM download WHERE schoolid = "+login.logined[req.cookies.sessionId]['schoolid']+" AND type = 'image'");
        }catch(er){
            console.log(er);
            return res.json({code:2,msg:"请按要求填写内容",ms:3000});
        }
        for(key in result){
            result[key]['time']=FnewDate(parseInt(result[key]['timestamp']));
        }
        return res.json({code:0,data:result});
    },
    getAllWallpaper:async function(req, res){
        if(!login.logined[req.cookies.sessionId]){
            return res.json({code:1,msg:"身份无效",ms:3000});
        }
        let file = fs.readdirSync(dirnameMain+"/public/img/wallpaper/");
        let result=[];
        for(key in file){
            result.push("./img/wallpaper/"+file[key]);
        }
        return res.json({code:0,data:result});
    }
}