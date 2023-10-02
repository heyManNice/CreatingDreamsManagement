//加载基础初始化服务
require('./server/init.js');
dirnameMain = __dirname;

//加载第三方模块
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');  
const app = express();

//服务器运行端口
const port = 3000;

//parser
app.use(bodyParser.json({limit: '50mb'}));
app.use(cookieParser({limit: '50mb'}));  

//加载服务组件
loadServer('pageRoute');
loadServer('sqlSafe');
loadServer('dataBase');
loadServer('login');
loadServer('massage');
loadServer('school');
loadServer('myhead');
loadServer('computer');
loadServer('socket');
loadServer('examine');
loadServer('download');
loadServer('logs');
loadServer('notice');
loadServer('screenshot');
loadServer('email');


//数据库连接
dataBase.connect();

//静态文件
app.use(express.static('public'));

//网页路由
app.get('/',pageRoute.index);
app.get('/login',pageRoute.login);
app.get('/test',pageRoute.test);

//API路由
app.post('/api/login',login.login);
app.post('/api/register',login.register);
app.post('/api/getVeri',login.getVeri);
app.post('/api/getSchool',school.getSchoolList);
app.post('/api/user_info',myhead.getInfo);
app.post('/api/getAllComputer',computer.getAllComputer);
app.post('/api/getNewExamine',examine.getNew);
app.post('/api/showMoreMsg',examine.showMoreMsg);
app.post('/api/sendResult',examine.sendResult);
app.post('/api/getAllImage',download.getAllImage);
app.post('/api/getAllWallpaper',download.getAllWallpaper);
app.post('/api/getAllLogs',logs.getAllLogs);
app.post('/api/getNewNotice',notice.getNew);
app.post('/api/ScToAdmin',screenshot.toAdmin);
app.post('/api/uplaodScreenshot',screenshot.uplaodScreenshot);

//监听
app.listen(port, () => {
    print(`系统已运行在 ${port}`);
})