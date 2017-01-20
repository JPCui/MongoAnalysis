/**
 *
 * Created by Administrator on 2016/11/1.
 */
var Host = require("./Host");

function Log() {
    this.id = '';

    this.time = '';

    this.level = '';

    this.thread = '';

    this.message = '';

    this.method = '';

    this.clazz = '';

    this.line = '';

    this.host = new Host();

    this.client = new Host();

    this.throwables = [];
}
Log.prototype.version = "20161101";

module.exports = Log;