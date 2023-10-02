const nodemailer = require("nodemailer");
email = {
    send:function (myclass,keyword,title,base64) {
        return new Promise(( resolve, reject ) => {
            let transporter = nodemailer.createTransport({
                service: 'qq', //使用的邮箱服务，这里qq为例
                port: 465, //邮箱服务端口号
                secure: true, // true for 465, false for other ports
                auth: {
                    user: "xxxxxxxxxxxx@qq.com", //  邮箱地址
                    pass: "xxxxxxxxxxxx", //授权码
                },
            });
            transporter.sendMail({
                from: '"校园统一管理系统"<xxxxxxx@qq.com>', // 你的邮箱
                to: "xxxxxxxxxxxx@qq.com", //发送的邮箱列表
                subject: '触发关键词黑名单', // 主题
                html: `
                <div>
                    <h1>${myclass.grade}年级${myclass.class}班似乎在浏览“${keyword}”</h1>
                    <a href="http://x.x.77.166:3000/">前往管理系统查看</a><br>
                    <p>截图：${title}</p>
                    <img class="myimg" src="${base64}" alt="截图">
                </div>
                <style>
                    .myimg{
                        height: 200px;
                    }
                </style>
                `
            }).then(myres => {
                console.log(myres)
                resolve({code:0});
            });
        });
    }
}