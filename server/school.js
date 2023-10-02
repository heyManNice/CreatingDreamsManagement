school={
    allSchool:undefined,
    getAllSchool:async function(){
        if(!school.allSchool){
            school.allSchool = await dataBase.query("SELECT * FROM school");
        }
        return school.allSchool;
    },
    getSchoolList:async function(req, res){
        if(!req.body&&isEmpty(req.body)){
            return res.json({callback:["warn.show"],msg:"未知错误,请刷新网页重试.或者联系管理员",ms:3000});
        }
        let allList = await school.getAllSchool();
        if(req.body.get=='nameList'){
            let nameList={};
            for(key in allList){
                nameList[allList[key]['id']]=allList[key]['name'];
            }
            console.log(nameList);
            return res.json({callback:[],nameList:nameList});
        }
    }
}