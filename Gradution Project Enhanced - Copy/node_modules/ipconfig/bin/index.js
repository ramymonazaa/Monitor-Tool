#!/usr/bin/env node

'use strict';

var app = require('cmdu');
var shell = require('../lib/shell');

app.version = require('../package.json').version;

app
    .command()
    .option('-f, --first', 'first option for default command')
    .action(function () {
        var result = shell.exec('ifconfig', 1);
        var ip = result.match(/inet (?!127)([^\s]+)/);
        console.log(ip && ip[1] || 'Unknown');
    });

app.listen();