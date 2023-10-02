const fs = require("fs");

screenshot={
    toAdmin:async function(req,res){
        if(!req.body.data||!computer.logined[req.body.data.key]){
            res.json({code:1,msg:'error'});
            return
        }
        mydata = req.body.data;
        for(i in login.logined){
            if(login.logined[i]["online"]==1 && login.logined[i]["schoolid"]==computer.logined[mydata.key]["schoolid"]){
                login.logined[i].reply(mydata);
            }
        }
        res.json({code:0,msg:'ok'});
    },
    uplaodScreenshot:async function(req,res){
        if(!req.body.data||!computer.logined[req.body.data.key]){
            res.json({code:1,msg:'error'});
            return
        }
        mydata = req.body.data;
        const base64 = mydata.base64_img.replace(/^data:image\/\w+;base64,/, "");
        let fileName=randomString(5)+new Date().getTime()+'.png';
        let fileUrl="./img/screenshot/"+fileName;
        fs.writeFile(dirnameMain+"/public/img/screenshot/"+fileName, base64, 'base64', async function (err) {
            if (err) {
                console.log(err);
            }else{
                //应该避免使用computer.logined
                let result = await dataBase.query(`INSERT INTO log (timestamp,schoolid,type,compurterid,content,img) VALUES ("${new Date().getTime()}", "${computer.logined[mydata.key]['schoolid']}","黑名单","${mydata.id}","触发窗口标题关键词：${mydata.title}","${fileUrl}");`);
                //ws.reply({callback:"setWallpaperOK",msg:"修改成功",fileUrl:fileUrl,id:message.id,new:1});
                //console.log(result.insertId);
                res.json({code:0,msg:'ok',insertId:result.insertId});
                let myclass = await dataBase.get('computer','class','id = '+mydata.id);
                myclass=JSON.parse(myclass)
                email.send(myclass,mydata.keywords,mydata.title,mydata.base64_img);
            }
        });
    }

}
function randomString(e) {    
    e = e || 32;
    var t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",
    a = t.length,
    n = "";
    for (i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
    return n
}