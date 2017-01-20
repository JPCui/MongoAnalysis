/**
 * Created by Administrator on 2016/9/23.
 */

var MongoDao = require("../mongo/mongo.dao.js");
var mongoDao = new MongoDao();

/**
 * 要求把collection=visit的数据格式写成 log.message = "IP API ..." 的格式
 * @constructor
 */
function MRService() {
    this.countApis = function (callback) {
        mongoDao.execute("visit", function (coll) {
            coll.mapReduce(CountApi.map, CountApi.reduce, {out: {inline: 1}}, function (err, datas) {
                datas.sort(function (a, b) {
                    return b.value - a.value;
                });
                callback(datas.slice(0, 20));
            });
        });
    };
    this.countIps = function (callback) {
        mongoDao.execute("visit", function (coll) {
            coll.mapReduce(CountIp.map, CountIp.reduce, {out: {inline: 1}}, function (err, datas) {
                datas.sort(function (a, b) {
                    return b.value - a.value;
                });
                callback(datas.slice(0, 20));
            });
        });
    };

    this.dailyActive = function (startTime, callback) {
        var endTime = new Date(startTime);
        endTime.setDate(endTime.getDate() + 1);
        mongoDao.execute("visit", function (coll) {
            coll.mapReduce(DailyActive.map, DailyActive.reduce, {
                out: {inline: 1},
                query: {"time": {'$gte': startTime, '$lt': endTime}}
            }, function (err, datas) {
                datas.sort(function (a, b) {
                    return b.value - a.value;
                });

                callback(datas);
            });
        });
    }
}

module.exports = MRService;

var DailyActive = {
    map: function () {
        var time = this.time;
        var hour = time.getHours();
        emit(hour, 1);
    },

    reduce: function (key, values) {
        var count = 0;
        values.forEach(function (value) {
            count += value;
        });
        return count;
    }
};

var CountApi = {
    map: function () {
        var message = this.message;
        if (message.indexOf("downloadServlet") === -1) {
            var indexIpEnd = message.indexOf(" ");
            var indexApiEnd = message.indexOf(" ", indexIpEnd + 1);
            var api = message.substr(indexIpEnd, indexApiEnd - indexIpEnd);
            var value = 1;
            emit(api, value);
        }
    },

    reduce: function (key, values) {
        var count = 0;
        values.forEach(function (value) {
            count += value;
        });
        return count;
    }
}

var CountIp = {
    map: function () {
        var message = this.message;
        var indexIpEnd = message.indexOf(" ");
        var ip = message.substr(0, indexIpEnd);
        var value = 1;
        emit(ip, value);
    },

    reduce: function (key, values) {
        var count = 0;
        values.forEach(function (value) {
            count += value;
        });
        return count;
    }
}