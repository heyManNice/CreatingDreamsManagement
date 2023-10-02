Vue.createApp({
    data() {
        return {
            page:'login',
            login:{
                phone:'',
                password:''
            },
            register:{
                school:-1,
                username:'',
                phone:'',
                phoneVeriCode:'',
                password_1:'',
                password_2:''
            },
            schoolInput:'',
            schoolNameList:{},
            schoolSearchList:[]
        }
    },
    created:function(){
        console.log("app have running");
        vueData=this;
    }
}).mount('#app');
//判断对象是否有空的内容
function isEmpty(obj){
    for(let i in obj){
        if(!obj[i]){
            return true;
        }
    }
    return false;
}

function alt(data){
    console.log(data.msg);
}
var timer;
function inputkeydown(){
    if(timer)clearTimeout(timer);
    timer =setTimeout(function(){
        searchSchool();
    },300)
}
function searchSchool(){
    if(vueData.schoolInput==""){
        vueData.schoolSearchList=[];
        return
    }
    let name = vueData.schoolInput.match(/[\u4e00-\u9fa5]/g);
    if(name){
        name=name.join("")
    }else{
        return
    }
    vueData.schoolSearchList=[];
    let f = 1;
    for(key in vueData.schoolNameList){
        let index = vueData.schoolNameList[key].indexOf(name)
        if(index == -1){
            continue;
        }
        let src_name = vueData.schoolNameList[key];
        let namef = `${src_name.slice(0,index)}<span class="schoolNameMatch">${src_name.slice(index,index+name.length)}</span>${src_name.slice(index+name.length)}`
        /* if(vueData.schoolNameList[key].includes(name)){
            vueData.schoolSearchList.push(vueData.schoolNameList[key]);
            f = 0;
        } */
        vueData.schoolSearchList.push(namef);
        f = 0;
    }
    if(f){
        vueData.schoolSearchList.push("找不到该学校")
    }
}
function submitLogin(){
    let data = vueData.login
    if(isEmpty(data)){
        warn.show({msg:"手机号或密码不能为空",ms:3000});
        return
    }
    warn.show({msg:"登录中，请稍后",ms:3000});
    request.post('login',data)
}
async function getSchoolNameList(){
    if(!Object.keys(vueData.schoolNameList).length){
        let results = await request.sync_post("getSchool",{get:"nameList"});
        vueData.schoolNameList = results.nameList;
        console.log(vueData.schoolNameList);
    }
}
function submitRegister(){
    let data = vueData.register;
    if(isEmpty(data)){
        warn.show({msg:"请按要求填写信息",ms:3000})
        return
    }
    let f =1;
    for(key in vueData.schoolNameList){
        if(vueData.schoolInput==vueData.schoolNameList[key]){
            vueData.register.school = key;
            f=0;
        }
    }
    if(f){
        warn.show({msg:"请输入有效的学校名称",ms:3000});
        return
    }
    if(data.phone.length!=11){
        warn.show({msg:"请填写11位手机号",ms:3000});
        return
    }
    if(data.password_1!=data.password_2){
        warn.show({msg:"密码和确认密码必须相同",ms:3000});
        return
    }
    request.post('register',data)
}
function getVeri(){
    let data = {};
    data.phone = vueData.register.phone;
    if(!data.phone||data.phone.length!=11){
        warn.show({msg:"请填写11位手机号",ms:3000});
        return
    }
    request.post('getVeri',data)
}
async function countDown(data){
    let em = document.querySelector(data.em)
    if(data.start>data.end){
        if(data.delclick){
            var tempMsg = em.innerHTML;
            var tempFunc = em.onclick;
            em.onclick = '';
            vueData.register.phoneVeriCode='';
        }
        for(let i = data.start;i > data.end;i--){
            em.innerHTML = i ;
            await sleep(1000);
        }
        if(data.delclick){
            em.innerHTML=tempMsg;
            em.onclick = tempFunc
        }
    }
}
//加载后判断url中的参数,目前给warn.u用
async function loadUrlParam(){
    let url = window.location.href;
    url = url.split('?')
    if(!url[1]){
        return
    }
    params=url[1].split('&')
    history.replaceState({},"",url[0]);
    for(let i in params){
        var keyVla=params[i].split('=')
        switch(keyVla[0]){
            case 'warn':
                if(keyVla[1]){
                    await sleep(10);
                    warn.show({msg:decodeURI(keyVla[1]),ms:3000})
                }
                break;
            default:
                break;
        }
    }
}
function switchUrl(data){
    if(data.url){
        window.location.replace(data.url)
    }
}