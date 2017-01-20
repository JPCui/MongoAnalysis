# 背景

- 线上部署了三台服务器，为了方便管理日志，因为没有多余的服务器，所以只能用单个mongodb(`log4mongo`)来收集系统运行日志，而且还要定时清理
- 自定义了一个访问日志appender，格式：[ip, request, time_expire]
- 闲着没事，干脆搞一个日志统计:
	- 用户请求的地域分布
	- 每日各时段访问情况
	- 接口调用情况：用于查询哪个接口最耗时

# 项目结构

## 配置文件

    \MongoAnalysis\src\mongo\config\mongo.config.js

## 代码结构

	/public						静态资源
		/javascripts
		/images
		/pages
		/stylesheets
	/routes						路由
	/src
		/common/util			工具类
		/controller				控制器
		/mongo					mongo操作类
		/service				业务
	/views						视图
	app.js
	package.json



# Demo

## 数据准备

首先往mongodb中导入一些数据，先给你们看看格式：

> db.visit.findOne()

	{
		"_id" : ObjectId("587d83f0c2d9ea7fa7be45ac"),
		"version" : "v20160428",
		"time" : ISODate("2017-01-17T02:39:44.656Z"),
		"level" : "INFO",
		"thread" : "catalina-exec-225",
		"message" : "[ip] [url] [time_expire]",
		"method" : "doFilter",
		"clazz" : "CUSTOM",
		"line" : "108",
		"throwables" : [ ]
	}

这里主要用到的字段就是 `message`

## Pages

- 首页
> /mr/ === /mr/index

- API 访问量统计
> /mr/count_api

- IP统计
> /mr/count_ip

- 近三日访问统计（基于时间段）
> /pages/daily_active.html

![area_distribution](http://7xnmsj.com1.z0.glb.clouddn.com/20170120.2)

- 区域访问量
> /pages/area_distribution.html

![area_distribution](http://7xnmsj.com1.z0.glb.clouddn.com/20170120.1)

# Refer

- node.js
- [mongodb MapReduce](https://docs.mongodb.com/manual/reference/method/db.collection.mapReduce/)
- [echarts](http://echarts.baidu.com/)
