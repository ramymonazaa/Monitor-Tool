var process = require('process')
const os = require('os');
var ut_sec = os.uptime();
var ut_min = ut_sec / 60;
var ut_hour = ut_min / 60;

ut_sec = Math.floor(ut_sec);
ut_min = Math.floor(ut_min);
ut_hour = Math.floor(ut_hour);

ut_hour = ut_hour % 60;
ut_min = ut_min % 60;
ut_sec = ut_sec % 60;

// console.log("Period of time system run: "
// + ut_hour + " Hour(s) "
// + ut_min + " minute(s) and "
// + ut_sec + " second(s)");


async function memoryInfo(res) {
    //console.log('Memory Usage:');
    let memory_list = []
    for (const [key, value] of Object.entries(process.memoryUsage())) {

        memory_list.push(`   Memory usage by ${key}, ${value/1000000}MB `)
    }
    const isOnline = require('is-online');
    //console.log("Internet connection state: ");
    isOnline().then(online => {
        if (online) {

            res.json({
                Memory_Usage: memory_list,
                State: "Online"
            })
        } else {

            res.json({
                Memory_Usage: memory_list,
                State: "offline"
            })
        }
    });
}

module.exports = memoryInfo