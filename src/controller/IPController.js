/**
 * Created by Administrator on 2017/1/18.
 */
var IPUtil = require('../common/util/ip.util');
var url = require('url');

/**
 * 
 * @param req
 * @param res
 * @param next
 */
exports.getIpInfo = function (req, res, next) {
    res.writeHead(200, {'Content-Type': 'application/json'});
    var params = url.parse(req.url, true).query;
    var ip = params.ip;
    console.log("ip: " + ip);

    var cityInfo = IPUtil.getCityByIp(ip, function (r) {
        var data = JSON.stringify(r);
        console.log("data: " + data);
        res.write(data);
        res.end();
    });
};