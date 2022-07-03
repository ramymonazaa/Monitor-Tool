var snmp = require("net-snmp");
var oids = ["1.3.6.1.2.1.31.1.1.1.3.1","1.3.6.1.2.1.31.1.1.1.5.1","1.3.6.1.2.1.31.1.1.1.2.1","1.3.6.1.2.1.31.1.1.1.4.1","1.3.6.1.2.1.2.2.1.5.1"];
var discriptions=["In Broadcast packet counter: ","Out Broadcast packet counter: ","In Multicast packet counter: ","Out Multicast packet counter: ","Port speed: "];

function theOutput(res){
    var session = snmp.createSession("127.0.0.1", "CCNP");
    var output= [];
    session.get(oids, function (error, varbinds) {
        if (error) {
            console.error(error);
        } else {
            for (var i = 0; i < varbinds.length; i++) {
                if (snmp.isVarbindError(varbinds[i])) {
                    console.error(snmp.varbindError(varbinds[i]));
                } else {
                    output.push(discriptions[i]+varbinds[i].oid + " = " + varbinds[i].value)
                }
            }
        }
        session.close();
        return res.json(output);
    });
   // return
    session.trap(snmp.TrapType.LinkDown, function(error) {
        if (error) {
            console.error(error);
        }
    });
}

//------------------ouput-------------------------------------
//In Broadcast packet counter: 1.3.6.1.2.1.31.1.1.1.3.1 = 257

//Out Broadcast packet counter: 1.3.6.1.2.1.31.1.1.1.5.1 = 76

//In Multicast packet counter: 1.3.6.1.2.1.31.1.1.1.2.1 = 0  

//Out Multicast packet counter: 1.3.6.1.2.1.31.1.1.1.4.1 = 0 

//Port speed: 1.3.6.1.2.1.2.2.1.5.1 = 10000000

module.exports = theOutput
