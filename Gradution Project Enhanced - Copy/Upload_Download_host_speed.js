const NetworkSpeed = require('network-speed'); // ES5
const testNetworkSpeed = new NetworkSpeed();
var uploadspeed, downloadspeed;

// getNetworkDownloadSpeed();
async function getNetworkDownloadSpeed() {
    const baseUrl = 'https://eu.httpbin.org/stream-bytes/500000';
    const fileSizeInBytes = 500000;
    return testNetworkSpeed.checkDownloadSpeed(baseUrl, fileSizeInBytes);
}

// getNetworkUploadSpeed();

async function getNetworkUploadSpeed() {
    const options = {
        hostname: 'www.amazon.com',
        port: 80,
        path: '/catchers/544b09b4599c1d0200000289',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const fileSizeInBytes = 2000
    return testNetworkSpeed.checkUploadSpeed(options, fileSizeInBytes);
}

module.exports.up = getNetworkUploadSpeed
module.exports.down = getNetworkDownloadSpeed