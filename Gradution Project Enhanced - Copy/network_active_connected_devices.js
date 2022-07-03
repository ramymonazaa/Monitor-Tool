const { findLocalDevices, getLocalDeviceList, findLocalDevice } = require('local-devices-gen-x');
// let mysql = require('mysql');

// let connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'monitor_tool'
// });



// connection.connect(function(err) {
//     if (err) {
//         return console.error('error: ' + err.message);
//     }
// });
var d;
async function isActive() {
    try {
        // Returns all devices within the '192.168.1.*' range as an array once the scan is complete.
        d = await getLocalDeviceList('192.168.43.1/24');
        // var sql = `INSERT INTO active_connected_devices (IP, MAC) VALUES ('${d[0]['ip']}', '${d[0]['mac']}')`;
        // connection.query(sql, function(err, result) {
        //     if (err) throw err;
        //     //console.log("1 record inserted");
        // });


        return d;
    } catch (e) { return err }
};

module.exports = isActive