var snmp = require("net-snmp");

var oids = ["1.3.6.1.2.1.1.3.0"];
var discriptions = ["Average CPU load for 5 minutes: ", "Free memory size: "];

function cpu(res) {
    var session = snmp.createSession("127.0.0.1", "CCNP");
    let listCpu = [];
    session.get(oids, function(error, varbinds) {
        if (error) {
            console.error(error);
        } else {
            for (var i = 0; i < varbinds.length; i++) {
                if (snmp.isVarbindError(varbinds[i])) {
                    console.error(snmp.varbindError(varbinds[i]));
                } else {
                    listCpu.push(discriptions[i] + varbinds[i].oid + " = " + varbinds[i].value);
                }
            }
        }
        session.close();
        return res.json(listCpu);
    });

    session.trap(snmp.TrapType.LinkDown, function(error) {
        if (error) {
            console.error(error);
        }
    });
}
module.exports = cpu;
////////////////////////////////////////////////////////////////---output///////////////////////////////////////////////////////////////////////
//Average CPU load for 5 seconds: 1.3.6.1.4.1.9.2.1.56.0 = 0

//Average CPU load for 60 seconds: 1.3.6.1.4.1.9.2.1.57.0 = 0

//Average CPU load for 5 minutes: 1.3.6.1.4.1.9.2.1.58.0 = 0

//Free memory size: 1.3.6.1.2.1.1.3.0 = 285045