/**
 * Created by Administrator on 2016/9/22.
 */
/**
 * router for MapReduce
 */
var express;
express = require('express');
var controller = require('../src/controller/IPController');
var router = express.Router();

router.get("/ip_info.json", controller.getIpInfo);

module.exports = router;
