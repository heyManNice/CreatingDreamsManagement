//封装mysql数据库连接
const mysql=require('mysql');
var timer;
dataBase={
    connect:function(){
        connection = mysql.createConnection({
            host     : 'xx.xx.xx.xxx',
            user     : 'school',
            password : 'school',
            database : 'school',
            useConnectionPooling: true
        });
        connection.on('error', async function (err) {
            print("数据库断开连接");
            if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                print("数据库重新连接");
                dataBase.connect();
            } else {
                throw err;
            }
        });
        connection.on('uncaughtException', async function (err) {
            print("数据库意外情况");
            if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                print("数据库重新连接");
                dataBase.connect();
            } else {
                throw err;
            }
        });
        connection.connect();
        timer=setInterval(dataBase.ping,600000);
    },
    ping:function(){
        dataBase.query("SELECT id FROM user");
        print('ping')
    },
    query:function(msg){
        return new Promise(( resolve, reject ) => {
            connection.query(msg, function (error, results, fields) {
                if (error) reject(error);
                resolve(results);
            });
        });
    },
    get:function(em,key,where){
        return new Promise(( resolve, reject ) => {
            connection.query(`SELECT ${key} FROM ${em} WHERE ${where}`, function (error, results, fields) {
                if (error) reject(error);
                try{
                    resolve(results[0][key]);
                }catch{
                    resolve(false);
                }
            });
        });
    },
    set:function(em,keyvalue,where){
        return new Promise(( resolve, reject ) => {
            console.log(`UPDATE ${em} SET ${keyvalue} WHERE ${where}`);
            connection.query(`UPDATE ${em} SET ${keyvalue} WHERE ${where}`, function (error, results, fields) {
                if (error) reject(error);
                console.log(results);
                resolve(results);
            });
        });
    }
}