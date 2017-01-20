var fs = require('fs');

function FileUtil() {

}

/**
 * 文件读取
 * @param uri
 * @param encoding
 * @returns {*}
 */
FileUtil.read = function (uri, encoding) {
    var encoding = encoding == null ? 'UTF-8' : encoding;  //定义编码类型
    try {
        var content = fs.readFileSync(uri, encoding);
        return content;
    } catch (e) {
        //e.message  //这里根据自己的需求返回
        return null;
    }
}

/**
 * 读取文件，并转换成json
 * @param uri
 * @param encoding
 * @returns {Object}
 */
FileUtil.readJson = function (uri, encoding) {
    var content = FileUtil.read(uri, encoding);
    var json = eval(content);
    return json;
}

module.exports = FileUtil;