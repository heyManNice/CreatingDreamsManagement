//日志打印功能
print = function(msg,type){
    let temp = new Date();
    let H = temp.getHours();
    let M = temp.getMinutes();
    let S = temp.getSeconds();
    let fmsg = `[${temp.getFullYear()}-${temp.getMonth()+1}-${temp.getDate()} ${H<10?"0"+H:H}:${M<10?"0"+M:M}:${S<10?"0"+S:S}] ${msg}`;
    switch(type){
        case 'err':
            console.error(fmsg);
            break;
        default:
            console.log(fmsg);
    }
}
//格式化时间功能
FnewDate=function (time) {
    function padZero(num) {
        return (num < 10 ? '0' : '') + num;
    }
    if (time) {
        var date = new Date(time);
    } else {
        var date = new Date();
    }
    var year = date.getFullYear(),
        month = padZero(date.getMonth() + 1),
        day = padZero(date.getDate()),
        hour = padZero(date.getHours()),
        min = padZero(date.getMinutes()),
        sec = padZero(date.getSeconds());
    var newTime =
        //year + '-' +
        month + '-' +
        day + ' ' +
        hour + ':' +
        min + ':' +
        sec;
    return newTime;
}
//加载组件功能
loadServer=function(name) {
    try {
        if ( typeof eval(name) != undefined) {
            print(name + "服务冲突",'err');
            return 1
        }
    } catch {
        require('./' + name + '.js')
        print(name + "服务已加载");
    }
}