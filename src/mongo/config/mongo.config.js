/**
 * Created by Administrator on 2016/9/22.
 */
/**
 * 按需求修改host port db
 * @type {{host: string, port: number, db: string}}
 */
// var config = {
//     "host" : "mongo.host",
//     "port" : 27017,
//     "db" : "db"
// };

//
// 我这里引用本地的配置，开发者应使用上面写法
//
var config = require("C:/mongo.config.js");

module.exports = config;