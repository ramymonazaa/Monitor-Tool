const express = require("express")
const app = express()
const devices = require('./devices&hosts_status')
const list = require('./list_interfaces')
const ipConfig = require('./ipconfig')
const isActive = require('./network_active_connected_devices')
const speed = require('./Upload_Download_host_speed')
const memoryInfo = require('./TimeSystemRun_MemoryUsage')
const session = require('./boadcast-and-multicast-packet-speed')
const err = require('./errors-occured')
const cpu1 = require('./cpu-and-memory-usage')
const trace = require('./TracePackets.js')

//file ===>Broadcast-and- multicast-packets-speed.js file
app.all('/boadcast', async(req, res) => {

    return session(res);
});

//file ====>errors-occured.js file
app.all('/errors', async(req, res) => {

    return err(res);
});

//file ====> cpu-and-memory-usage.js
app.all('/usage', async(req, res) => {

    return cpu1(res);
});
//file ====> device&hosts_status.js
app.all('/host', async(req, res) => {
        let result = await devices();
        res.json(result)
    })
    //file =====> ipconfig.js
app.all('/ipconfig', async(req, res) => {
    ipConfig(req, res)
})

// file ====> list_interface.js
app.all('/interface', async(req, res) => {
    res.json(list)
})

app.all('/trace', async(req, res) => {
        res.json(trace)
    })
    //file ===> Upload_Download_host_speed.js

app.all('/speeds', async(req, res) => {
    res.json({
        download: await speed.down(),
        upload: await speed.up(),
    })
})


//file ====>  network_active_connected_device.js

app.all('/active', async(req, res) => {
    res.json(await isActive())
})


//file ====> TimeSystemRun_memoryUsage.js

app.all('/memory-info', async(req, res) => {
    await memoryInfo(res);
})

app.all('/ipconfig', (req, res) => ipConfig(req, res))
port = process.env.PORT || 3000
app.listen(port, console.log(`listening on port ${port}`))