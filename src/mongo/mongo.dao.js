/**
 * Created by Administrator on 2016/9/22.
 */

var config = require("./config/mongo.config.js");
var mongodb = require("mongodb");
// var mongodbServer = mongodb.Db(config.host, config.port, {auto_reconnect: true, poolSize: 10});
// var db = new mongodb.Db('test', mongodbServer);
var mongoClient = mongodb.MongoClient;

function Mongo() {
    /**
     * 默认查询数
     * @type {number}
     */
    this.DEFAULT_QUERY_SIZE = 10;

    var host = config.host;

    var port = config.port;

    var db = config.db;

    var conn_str = "mongodb://" + host + ":" + port + "/" + db;

    /**
     * 查询
     * @param collection
     * @param callback
     * @usage
     * callback = function(coll) { coll.find({a:1}).limit(2).toArray() }
     */
    this.execute = function(collName, callback) {
        mongoClient.connect(conn_str, function (err, db) {
            var collection = db.collection(collName);
            callback(collection);
            // db.close();
        });
    }


}

module.exports = Mongo;