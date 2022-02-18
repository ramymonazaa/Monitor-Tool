var Cap = require('Cap').Cap;
var decoders = require('Cap').decoders;
var PROTOCOL = decoders.PROTOCOL;
//console.dir(Cap.deviceList().length);
//console.dir(Cap.deviceList());

// const DeviceDetector = require('node-device-detector');
// const detector = new DeviceDetector;
// const userAgent = 'Mozilla/5.0 (Linux; Android 5.0; NX505J Build/KVT49L) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.78 Mobile Safari/537.36';
// const result = detector.detect(userAgent);
// console.log('result parse', result);
// const DeviceDetector = require('node-device-detector');
// const DeviceHelper = require('node-device-detector/helper');

// const detector = new DeviceDetector;
// const userAgent = 'Mozilla/5.0 (Linux; Android 5.0; NX505J Build/KVT49L) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.78 Mobile Safari/537.36';
// const result = detector.detect(userAgent);

// /* check device type (feature phone, smartphone or phablet) */
// var a=DeviceHelper.isMobile(result);
// console.log(a);
// /* check device type is desktop */
// DeviceHelper.isDesktop(result);
// /* check device type is tablet  */
// DeviceHelper.isTablet(result);
// /* check device type car (side panel in car)  */
// DeviceHelper.isCar(result);
// /* check device type feature phone (push-button telephones)  */
// DeviceHelper.isFeaturePhone(result);
// /* check device type smartphone  */
// DeviceHelper.isSmartphone(result);
// /* check device type phablet  */
// DeviceHelper.isPhablet(result);
// /* check device type game console (xBox, PlayStation, Nintendo etc)  */
// DeviceHelper.isConsole(result);
// /* check device type smart speaker (Alisa, Alexa, HomePod etc) */
// DeviceHelper.isSmartSpeaker(result);
// /* check device type SmartTV/TV box */
// DeviceHelper.isTv(result);
// /* check device type portable camera */
// DeviceHelper.isCamera(result);
// /* portable terminal, portable projector */
// DeviceHelper.isPeripheral(result);
// /* LCD panel or interactive panel  */
// DeviceHelper.isSmartDisplay(result);
// /* check device type boxes, blu-ray players */
// DeviceHelper.isPortableMediaPlayer(result);
// /* check device type watches, headsets */
// DeviceHelper.isWearable(result);
// /* result device type number id */
// DeviceHelper.getDeviceTypeId(result);
// /* result device type string */
// DeviceHelper.getDeviceType(result);
// /* result client type string */
// DeviceHelper.getClientType(result);

// const InfoDevice = require('node-device-detector/parser/device/info-device');
// const infoDevice = new InfoDevice;
// const result = infoDevice.info('Asus', 'Zenfone 4');
// console.log('Result information', result);

// var http = require("http");
 
//      http.get({host: "www.amazon.org"}, function(res){
//     if( res.statusCode == 200 )
//    console.log("This site is up and running!");
//  else
//    console.log("This site might be down "+res.statusCode);
//    });

const os = require('os');
  
// Print os.networkInterfaces() value
var net_int = os.networkInterfaces();
  
var no_of_network_interfaces = 0;
  
for (var key in net_int) {
  console.log(key);
  var net_infos=net_int[key];
     
  net_infos.forEach(element => {      
  no_of_network_interfaces++;
  console.log("\tinterface:");
  
    for (var attr in element){
      console.log("\t\t" + attr + 
          " : " + element[attr] );
    }
  });  
}
  
console.log("total number of Network "
  + "interfaces is " + no_of_network_interfaces);

  const express = require('express'); // using express
const socketIO = require('socket.io');
const http = require('http') 
const port = process.env.PORT||3000 // setting the port 
let app = express();
let server = http.createServer(app)
let io = socketIO(server)

io.on('connection', (socket)=>{
    console.log('New user connected');
  });
server.listen(port);

