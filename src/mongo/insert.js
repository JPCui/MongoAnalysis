/**
 * Created by Administrator on 2016/9/22.
 */
var MongoClient = require('mongodb').MongoClient;
var config = require("C:/mongo.config.js");
var DB_CONN_STR = 'mongodb://' + config.host + ':' + config.port + '/' + config.db;

var insertData = function (db, callback) {
    //连接到表
    var collection = db.collection('test');
    //插入数据
    var data = [{"name": 'wilson001', "age": 21}, {"name": 'wilson002', "age": 22}];
    collection.insert(data, function (err, result) {
        if (err) {
            console.log('Error:' + err);
            return;
        }
        callback(result);
    });
}

MongoClient.connect(DB_CONN_STR, function (err, db) {
    console.log("连接成功！");
    insertData(db, function (result) {
        console.log(result);
        db.close();
    });
});
