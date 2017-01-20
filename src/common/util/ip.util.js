/**
 * Created by Administrator on 2017/1/18.
 */

// http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=json&ip=202.196.35.35

var http = require('http');
var rp = require('request-promise');

function IPUtil() {
}

IPUtil.getCityByIp = function (ip, callback) {
    var api = "http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=json&ip=" + ip;

    var opt = {
        uri: api,
        json: true,
        async: false,
        header: {"Content-Type": "application/json; charset=utf-8"}
    };
    rp(opt)
        .then(function (res) {
            console.log(callback);
            if (callback) {
                callback(res);
            }
        }).catch(function (err) {
        console.error(err);
    });
}

module.exports = IPUtil;

// console.log(IPUtil.getCityByIp("202.196.35.35", function (r) {
//     var data = JSON.stringify(r);
//     console.log("data: " + data);
// }));