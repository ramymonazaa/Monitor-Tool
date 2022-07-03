const snmp = require("net-snmp");

oids = ["1.3.6.1.2.1.2.2.1.20.1", "1.3.6.1.2.1.4.4.0"];
var discriptions = ["Number of packets containing errors(ifOutErrors): ", "ip In Header Errors: "];

function errors(res) {
    var session = snmp.createSession("127.0.0.1", "CCNP");
    let listError = [];
    session.get(oids, function(error, varbinds) {

        if (error) {

            console.error(error);


        } else {
            for (var i = 0; i < varbinds.length; i++) {
                if (snmp.isVarbindError(varbinds[i])) {

                    console.error(snmp.varbindError(varbinds[i]));

                } else {

                    listError.push(discriptions[i] + varbinds[i].oid + " = " + varbinds[i].value);
                }
            }
        }
        session.close();
        return res.json(listError);
    });
    session.trap(snmp.TrapType.LinkDown, function(error) {
        if (error) {
            console.error(error);
        }
    });
}
module.exports = errors;
///////////////////////////////////////////////-output------------------------
//Reboot reason: 1.3.6.1.4.1.9.2.1.2.0 = unknown reload cause - suspect boot_data[BOOT_COUNT] 0x0, BOOT_COUNT 0, BOOTDATA 19

//Number of packets containing errors(ifOutErrors): 1.3.6.1.2.1.2.2.1.20.1 = 0

//ip In Header Errors: 1.3.6.1.2.1.4.4.0 = 0