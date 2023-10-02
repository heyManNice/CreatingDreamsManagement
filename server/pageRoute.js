pageRoute = {
    index:async function(req, res){
        if(!(req.cookies&&req.cookies.sessionId)){
            return res.send(`<script>window.location.replace('./login')</script>`)
        }
        if(!login.logined[req.cookies.sessionId]){
            return res.send(`<script>window.location.replace('./login?warn=身份验证失效，请重新登录')</script>`)
        }
        if(login.logined[req.cookies.sessionId]['isAdmin']){
            print("管理员"+login.logined[req.cookies.sessionId]['username']+"登入");
            return res.sendFile( dirnameMain + '/admin.html')
        }
        print("教师"+login.logined[req.cookies.sessionId]['username']+"登入");
        return res.sendFile( dirnameMain + '/teacher.html')
    },
    login:async function(req, res){
        if(req.cookies&&req.cookies.sessionId&&login.logined[req.cookies.sessionId]){
            return res.send(`<script>window.location.replace('/')</script>`)
        }
        print("访问登录页面")
        return res.sendFile( dirnameMain + '/login.html')
    },
    test:async function(req, res){
        return res.send(`<script>window.location.replace('./login')</script>`)
    }
}