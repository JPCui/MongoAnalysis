/**
 * Created by Administrator on 2016/9/22.
 */
/**
 * demos for mongo.dao.js
 * @type 
 */
var MongoDao = require("./mongo.dao.js");

var mongoDao = new MongoDao();
mongoDao.execute("test", function (coll) {
    var datas = coll.find({}).limit(2).toArray(function (err, datas) {
        console.log(datas);
    });
});

// MapReduce
mongoDao.execute("visit", function (coll) {
    var datas = coll.mapReduce(map, reduce, {out: {inline: 1}}, function(err, datas) {
        console.log(datas);
    });
});


var map = function() {
    var message = this.message;
    var indexIpEnd = message.indexOf(" ");
    var ip = message.substr(0, indexIpEnd);
    var value = 1;
    emit(ip, value);
};

var reduce = function(key, values) {
    var count = 0;
    values.forEach(function(value) {
        count += value;
    });
    return count;
}