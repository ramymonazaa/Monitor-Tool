const netList = require('network-list');
var active_devices=new Array();
netList.scanEach({}, (err, obj) => {  
    active_devices.push(obj);
    console.log("ip: "+obj.ip+", online status: "+(obj.alive==true?"alive":"dead")+", hostname: "+obj.hostname+", mac: "+obj.mac); // device object   
});

// for(var i=0;i<active_devices.length;i++)
// {
//     console.log(active_devices[i].ip);
// }
//  netList.scan({}, (err, arr) => {
//      if(arr.alive==true)
//      console.log(arr.ip+" "+arr.mac); // array with all devices
//  });