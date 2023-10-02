myhead = {
    getInfo:async function(req, res){
        if(!(req.cookies&&req.cookies.sessionId||!login.logined[req.cookies.sessionId])){
            return res.json({code:403});
        }
        let result = {};
        let schoolList = await school.getAllSchool();
        result['username'] = login.logined[req.cookies.sessionId]['username'];
        result['isAdmin'] = login.logined[req.cookies.sessionId]['isAdmin'];
        for(key in schoolList){
            if(schoolList[key]['id']==login.logined[req.cookies.sessionId]['schoolid']){
                result['schoolname']=schoolList[key]['name'];
                result['schoolid']=schoolList[key]['id'];
            }
        }
        return res.json({code:0,data:result});
    }
}