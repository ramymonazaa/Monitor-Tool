const express = require('express')
const app = express()

const largeStrings=[];
const largeNum=[];
const largeDates=[];
function really_long_fn(){
    for(letx=0;x<1000;++x){
        const waste=Math.random();
        console.log(`sample text`,x,waste);
    }
}



const port = 3000

app.get('/hello', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})