const { findLocalDevices, getLocalDeviceList, findLocalDevice } = require('local-devices-gen-x');

(async () => {
  try { 
    // Returns all devices within the '192.168.1.*' range as an array once the scan is complete.
    var d=await getLocalDeviceList('192.168.1.1/24');
    console.log(d);
  } catch (e) { console.error(e) }
})();