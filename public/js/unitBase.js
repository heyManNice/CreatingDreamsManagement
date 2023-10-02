haveLoaded=0
if (typeof unitRAW === 'undefined'){
    unitRAW={}
}
if (typeof unitData === 'undefined'){
    unitData={}
}
bootFunc=[];
function load(unit){
    if (unitRAW[unit]){
        loadHSC(unit)
        return 0;
    }
    xhrLoad(unit)
}
function xhrLoad(unit){
    let xhr = new XMLHttpRequest()
    xhr.open("GET", './units/'+unit+'.u')
    xhr.send()
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            unitRAW[unit]=xhr.responseText
            loadHSC(unit)
        }
    }
}
function loadHSC(unit){
    let page = unitRAW[unit].match(/(?<=<page>)(.*?)(?=<\/page>)/gs);
    if(page[0]){
        document.querySelector(unit).innerHTML=page[0];
        haveLoaded++;
        if(haveLoaded==units.length){
            if(typeof vueData === 'undefined'){
                appRun();
            }
        }
    }
    let scri = unitRAW[unit].match(/(?<=<script>)(.*?)(?=<\/script>)/gs);
    if(scri[0]){
        runScript(scri[0])
    }
    let sty = unitRAW[unit].match(/(?<=<style>)(.*?)(?=<\/style>)/gs);
    if(sty[0]){
        loadStyle(sty[0])
    }
}
function runScript(script){
    const newScript = document.createElement('script');
    newScript.innerHTML = script;
    document.head.appendChild(newScript);
    document.head.removeChild(newScript);
}
function loadStyle(sty) {
    let style = document.createElement('style')
    style.innerHTML=sty
    let head = document.getElementsByTagName('head')[0]
    head.appendChild(style)
}

function appRun(){
    Vue.createApp({
        data() {
            return {
            }
        },
        created:function(){
            //console.log("app have running");
            this.unit = window;
            vueData=this;
        }
    }).mount('#app');
}
async function vueData_load(data,callback){
    if(typeof vueData === 'undefined'){
        await sleep(20);
        vueData_load(data,callback);
    }else{
        if(Object.keys(data).length){
            mount(data);
        }
        callback();
    }
}
function mount(data){
    for(key in data.data){
        vueData[key]=data.data[key]
    }
    for(key in data.get){
        let temp = document.querySelector(data.name).getAttribute(key)
        document.querySelector(data.name).removeAttribute(key)
        if(temp){
            vueData[key]=temp;
        }else{
            vueData[key]=data.get[key];
        }
    }
    vueData.$forceUpdate()
}
window.onload=function(){
    if(units){
        for(i in units){
            load(units[i])
        }
    }
}