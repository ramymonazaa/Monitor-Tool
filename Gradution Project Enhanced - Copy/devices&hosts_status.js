const ping = require('ping');
const hosts = ['192.168.1.1', ' 172.31.214.28', '127.0.0.1'];


async function isConnected(hosts) {
    msg = await ping.promise.probe(hosts).then(function(res) {
        return res;
    });
    return msg;
}


async function devices_(hosts_ = hosts) {
    result = []
    for (let i = 0; i < hosts.length; i++) {
        result.push(await isConnected(hosts[i]))

    }
    //console.log(result);
    return result
}
var w = devices_;
module.exports = w;