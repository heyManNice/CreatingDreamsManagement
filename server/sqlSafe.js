//判断对象是否有空的内容
isEmpty = function(obj){
    if(!Object.keys(obj).length){
        return true;
    }
    for(let i in obj){
        if(!obj[i]){
            return false;
        }
    }
    return true;
}
isSafe = function(obj){
    let keys = [" WHERE", " where", ";", " AND", " and", " OR", ' or'];
    let allStr=obj.json;
    for(let i in obj){
        allStr+=obj[i];
    }
    for(let i in keys){
        if(allStr.includes(keys[i])){
            return false;
        }
    }
    return true;
}