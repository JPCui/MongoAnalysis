/**
 * Created by Administrator on 2016/9/22.
 */
var express = require('express');
var MRService = require('../service/mr.service');
var router = express.Router();

/* GET home page. */
exports.index = indexController;
exports.countIp = countIpController;
exports.countApi = countApiController;
exports.dailyActive = dailyActiveController;
exports.countIpJson = countIpJsonController;

var mrService = new MRService();

/**
 * 首页
 * @param req
 * @param res
 * @param next
 */
function indexController(req, res, next) {
    mrService.countIps(function (countIps) {
        mrService.countApis(function (countApis) {
            res.render('mr/index', {countIps: countIps, countApis: countApis});
        });
    });
};

/**
 * count_ip
 * @param req
 * @param res
 * @param next
 */
function countIpController(req, res, next) {
    mrService.countIps(function (datas) {
        res.render('mr/count_ip', {datas: datas});
    });
}

/**
 * count_ip
 * @param req
 * @param res
 * @param next
 */
function countApiController(req, res, next) {
    mrService.countApis(function (datas) {
        res.render('mr/count_api', {datas: datas});
    });
}

function countIpJsonController(req, res, next) {
    mrService.countIps(function (datas) {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(datas));
    });
}

/**
 *
 * @param req req.params
 * @param res
 * @param next
 */
function dailyActiveController(req, res, next) {
    var today = new Date();
    var d1 = new Date((today.getYear() + 1900) + "-" + (today.getMonth() + 1) + "-" + today.getDate() + " 00:00:00");
    var d2 = new Date(d1);
    d2.setDate(d2.getDate() - 1);
    var d3 = new Date(d2);
    d3.setDate(d3.getDate() - 1);

    var rs = new Array();
    mrService.dailyActive(d1, function (datas) {
        dateKey = (d1.getMonth() + 1) + "-" + d1.getDate();
        rs.push({date: dateKey, datas: datas});

        mrService.dailyActive(d2, function (datas) {
            dateKey = (d2.getMonth() + 1) + "-" + d2.getDate();
            rs.push({date: dateKey, datas: datas});

            mrService.dailyActive(d3, function (datas) {
                dateKey = (d3.getMonth() + 1) + "-" + d3.getDate();
                rs.push({date: dateKey, datas: datas});

                res.writeHead(200, {'Content-Type': 'application/json'});
                res.end(JSON.stringify(rs));
            });
        });
    });
}
