var process = require('process')
const os = require('os');
var ut_sec = os.uptime();
var ut_min = ut_sec/60;
var ut_hour = ut_min/60;

ut_sec = Math.floor(ut_sec);
ut_min = Math.floor(ut_min);
ut_hour = Math.floor(ut_hour);

ut_hour = ut_hour%60;
ut_min = ut_min%60;
ut_sec = ut_sec%60;

console.log("Period of time system run: "
+ ut_hour + " Hour(s) "
+ ut_min + " minute(s) and "
+ ut_sec + " second(s)");
console.log('Memory Usage:');
for (const [key,value] of Object.entries(process.memoryUsage())){
    
    console.log(`   Memory usage by ${key}, ${value/1000000}MB `)
}
const isOnline = require('is-online');
console.log("Internet connection state: ");
isOnline().then(online => {
if(online){
    // document.write("Connected to internet")
    console.log("   Connected to internet");
}else{
    //document.write("Not connected to internet");
    console.log("   Not connected to internet");
}
});