var network = require("network");
network.get_gateway_ip(function(err, ip) {
  if (err) {
    //console.log("No Gateway IP found!");
  } else {
      //console.log(ip);
      var arp = require('node-arp');
      
      arp.getMAC(ip, function(err, mac) {
          if (!err) {
            require('dns').lookup(require('os').hostname(), function (err, add, fam) {             
                console.log('addr: ' + add);
                console.log(`Gateway IP: ${ip}`);
                console.log(`Mac Address: ${mac}`);
              })
        }
        else
        console.log("Can't find");
    });
  }
});