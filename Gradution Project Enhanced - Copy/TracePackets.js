var Cap = require('cap').Cap;
var decoders = require('cap').decoders;
var PROTOCOL = decoders.PROTOCOL;
var c = new Cap();
var device = Cap.findDevice('192.168.43.93');
var filter = 'tcp and dst port 80';
var bufSize = 10 * 1024 * 1024;
var buffer = Buffer.alloc(65535);

var linkType = c.open(device, filter, bufSize, buffer);

c.setMinBytes && c.setMinBytes(0);
let tracing = [];
c.on('packet', function(nbytes, trunc) {
    tracing.push(`////////////////////////////////////Packet Cap :\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ `)

    tracing.push('packet: length ' + nbytes + ' bytes, truncated? ' +
        (trunc ? 'yes' : 'no'));


    // raw packet data === buffer.slice(0, nbytes)

    if (linkType === 'ETHERNET') {
        var ret = decoders.Ethernet(buffer);


        if (ret.info.type === PROTOCOL.ETHERNET.IPV4) {
            tracing.push('Decoding IPv4 ...');

            ret = decoders.IPV4(buffer, ret.offset);
            tracing.push('from: ' + ret.info.srcaddr + ' to ' + ret.info.dstaddr);

            if (ret.info.protocol === PROTOCOL.IP.TCP) {
                var datalen = ret.info.totallen - ret.hdrlen;

                tracing.push('Decoding TCP ...');

                ret = decoders.TCP(buffer, ret.offset);
                tracing.push(' from port: ' + ret.info.srcport + ' to port: ' + ret.info.dstport);
                tracing.push("--------------------------------------")
                datalen -= ret.hdrlen;
                tracing.push(buffer.toString('binary', ret.offset, ret.offset + datalen));
            } else if (ret.info.protocol === PROTOCOL.IP.UDP) {
                tracing.push('Decoding UDP ...');

                ret = decoders.UDP(buffer, ret.offset);
                tracing.push(' from port: ' + ret.info.srcport + ' to port: ' + ret.info.dstport);
                tracing.push(buffer.toString('binary', ret.offset, ret.offset + ret.info.length));
            } else
                tracing.push('Unsupported IPv4 protocol: ' + PROTOCOL.IP[ret.info.protocol]);
        } else
            tracing.push('Unsupported Ethertype: ' + PROTOCOL.ETHERNET[ret.info.type]);
    }
});
module.exports = tracing;