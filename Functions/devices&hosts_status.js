var ping = require('ping');

var hosts = ['192.168.1.1', '192.168.1.7', 'wikipedia.org'];
hosts.forEach(function(host){
    ping.sys.probe(host, function(isAlive){
        var msg = isAlive ? 'host ' + host + ' is alive' : 'host ' + host + ' is dead';
        console.log(msg);
    });
});