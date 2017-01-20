/**
 * Created by Administrator on 2016/9/22.
 */
/**
 * router for MapReduce
 */
var express;
express = require('express');
var MR = require('../src/controller/mr.controller');
var router = express.Router();

router.get("/", MR.index);
router.get("/index", MR.index);
router.get("/count_ip", MR.countIp);
router.get("/count_api", MR.countApi);
router.get("/daily_active.json", MR.dailyActive);
router.get("/count_ip.json", MR.countIpJson);

module.exports = router;
