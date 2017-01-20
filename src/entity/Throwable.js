/**
 * Created by Administrator on 2016/11/1.
 */

var StackTrace = require('./StackTrace');

function Throwable() {
    this.clazz = '';

    this.message = '';

    this.stackTraces = [];
}

module.exports = Throwable;