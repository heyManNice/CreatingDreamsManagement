const Core = require('@alicloud/pop-core');

massage = {
    send:function(code,phone){
        return new Promise(( resolve, reject ) => {
            let client = new Core({
                accessKeyId: 'xxxxxxx',
                accessKeySecret: 'xxxxxx',
                // securityToken: '<your-sts-token>', // use STS Token
                endpoint: 'https://dysmsapi.aliyuncs.com',
                apiVersion: '2017-05-25'
            });
            let params = {
                "SignName": "校园多媒体统一管理系统",
                "TemplateCode": "xxxxx",
                "PhoneNumbers": phone,
                "TemplateParam": "{\"code\":\""+code+"\"}"
            }
            
            let requestOption = {
                method: 'POST',
                formatParams: false,
            };
            client.request('SendSms', params, requestOption).then((result) => {
                    resolve(JSON.stringify(result));
                }, (ex) => {
                    reject(ex);
            })
        });
    }
}