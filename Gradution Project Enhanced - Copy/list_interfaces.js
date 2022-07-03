const os = require('os');

// Print os.networkInterfaces() value
var net_int = os.networkInterfaces();

var no_of_network_interfaces = 0;
var list = {};
for (var key in net_int) {


    var net_infos = net_int[key];
    list[key] = net_infos


}
module.exports = list