var network = require("network");
var arp = require('node-arp');
module.exports = wrapper

function wrapper(req, res) {
    network.get_gateway_ip((err, ip) => {
        if (err) {
            //console.log("No Gateway IP found!");
        } else {
            //console.log(ip);
            helper(req, res, ip)
                // const app=express();

        }
    });
}


function helper(req, res, ip) {
    arp.getMAC(ip, (err, mac) => {
        if (!err) {
            require('dns').lookup(require('os').hostname(), (err, add, fam) => {
                // console.log('addr: ' + add);
                // console.log(Gateway IP: ${ip});
                // console.log(Mac Address: ${mac});

                res.json({
                    address: add,
                    Gateway_IP: ip,
                    Mac_Address: mac
                })
            })
        } else
            console.log("Can't find");
    });
}