//封装前端Ajax请求
request={
    post: function (route, json) {
        let xhr = new XMLHttpRequest();
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                let newJson;
                try{
                    newJson = JSON.parse(this.responseText);
                }catch{
                    warn.show({msg:"未知错误，请联系管理员",ms:3000})
                    return
                }
                if (newJson['callback']) {
                    for(let i=0;i<newJson['callback'].length;i++){
                        eval(newJson['callback'][i])(newJson);
                    }
                }
            }
        });
        xhr.open("POST", "./api/" + route);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(json));
    },
    get: function (route) {
        var xhr = new XMLHttpRequest();
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                var newJson = JSON.parse(this.responseText);
                if (newJson['callback']) {
                    for(let i=0;i<newJson['callback'];i++){
                        newJson['callback'][i]();
                    }
                }
            }
        });
        xhr.open("GET", "./api/" + route);
        xhr.send();
    },
    sync_post: function (route, json) {
        return new Promise(( resolve, reject ) => {
            let xhr = new XMLHttpRequest();
            xhr.addEventListener("readystatechange", function () {
                if (this.readyState === 4) {
                    let newJson;
                    try{
                        newJson = JSON.parse(this.responseText);
                    }catch{
                        resolve({code:0,msg:"未知错误，请联系管理员"});
                        return
                    }
                    resolve(newJson);
                }
            });
            xhr.open("POST", "./api/" + route);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify(json));
        });
    },
    cookieToJson:function () {
        let cookieArr = document.cookie.split(";");
        let obj = {} 
        cookieArr.forEach((i) => {
            let arr = i.split("=");
            obj[arr[0]] = arr[1];
        });
        return obj
      }
}