const express = require('express')
const app = express()

//user
const credential = {
    email: "admin@gmail.com",
    password: "admin123"
}


// login user


const port = 3000
app.set('view engine', 'ejs')
app.use(express.static('public'))

//for auto refresh
const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));


const connectLivereload = require("connect-livereload");
app.use(connectLivereload());

liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
        liveReloadServer.refresh("/");
    }, 100);
});

const devices = require('./devices&hosts_status')
const list = require('./list_interfaces')
const ipConfig = require('./ipconfig')
const isActive = require('./network_active_connected_devices')
const speed = require('./Upload_Download_host_speed')
const memoryInfo = require('./TimeSystemRun_MemoryUsage')
const system_ = require('./systeminformation_');
const err = require('./errors-occured')
const cpu1 = require('./cpu-and-memory-usage')
const session = require('./boadcast-and-multicast-packet-speed')
const trace = require('./TracePackets.js')

const { response } = require('express')

//file device&hosts_status.js
app.all('/host', async(req, res) => {
    let result = await devices();
    // console.log(result)
    res.json(result)
})

app.all('/boadcast', async(req, res) => {

    return session(res);
});


app.all('/errors', async(req, res) => {

    return err(res);
});
//
app.all('/usage', async(req, res) => {

    return cpu1(res);
});

app.all('/info', async(req, res) => {
    // si.cpu()
    //     .then(data => console.log(data))

    // .catch(error => console.error(error));

    res.json(system_)
})


//file ipconfig.js
app.all('/ipconfig', async(req, res) => {

    ipConfig(req, res)
})
app.all('/trace', async(req, res) => {
        res.json(trace)
    })
    //file list_interface.js
app.all('/interface', async(req, res) => {
    res.json(list)
})
app.all('/real', async(req, res) => {
    res.render("ip.ejs")
})

app.all('/sp', async(req, res) => {
    res.render("speed.ejs")
})
app.all('/draw', async(req, res) => {
    res.render("draw.ejs")
})


app.all('/cp', async(req, res) => {
    res.render("cpu.ejs")
})

app.get('/nodejs', (req, res) => res.redirect('https://ipapi.co/json'))
app.get('/inspect', (req, res) => res.redirect('chrome://inspect/#devices'))
app.get('/js', (req, res) => res.redirect('https://api.jsonbin.io/b/62c0eabc449a1f382129dfb5'))
app.get('/graphic', (req, res) => res.redirect('https://app.diagrams.net'))

//file Upload_Download_host_speed.js

app.all('/speeds', async(req, res) => {
    res.json({
        download: await speed.down(),
        upload: await speed.up(),
    })
})


//file  network_active_connected_device.js

app.all('/active', async(req, res) => {
    res.json(await isActive())
})

app.all('/local', async(req, res) => {
    res.json(local)
})

//file TimeSystemRun_memoryUsage.js

app.all('/memory-info', async(req, res) => {
    await memoryInfo(res);
})
app.all('/ipconfig', (req, res) => ipConfig(req, res))




app.get('/about', (req, res) => {
    res.render("about.ejs")
})



app.get('/', (req, res) => {
    res.render("Login.ejs")
})
app.get('/Dashboard', (req, res) => {
    res.render("Dashboard.ejs")
})

app.get('/about', (req, res) => {
    res.render("about.ejs")
})
app.get('/ip', (req, res) => {
    res.render("ipconfig.ejs")
})

app.use((req, res) => {
    res.redirect("Dashboard")
})

app.all('/speedtest', (req, res) => {
    res.render("speed.ejs")
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}/`)
})