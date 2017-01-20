/**
 * Created by Administrator on 2017/1/18.
 */

// http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=json&ip=202.196.35.35
/**
 * @return var remote_ip_info = ...
 * @constructor
 */
function IPUtil() {
}

IPUtil.getCityByIp = function (ip) {
    var r = new Object();
    var api = "/util/ip_info.json?ip=";
    $.ajax({
        url: api + ip,
        async: false,
        dataType: "json",
        success: function (data) {
            if (data.ret == 1) {
                r.province = data.province;
            }
        },
        error: function (a, b, c) {
            console.log(a);
            console.log(b);
            console.log(c);
        }
    });

    return r;
}
