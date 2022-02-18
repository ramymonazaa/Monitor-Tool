const si = require('systeminformation');

si.cpu()
    .then(data => console.log(data))
    .catch(error => console.error(error));

// full async / await example (node >= 7.6)
async function cpu() {
    try {
        const data = await si.cpu();
        console.log(data)
    } catch (e) {
        console.log(e)
    }
}
