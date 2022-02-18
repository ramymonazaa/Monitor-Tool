const isOnline = require('is-online');

isOnline().then(online => {
  if(online){
     console.log("Connected to internet");
     var st="Connected to internet";
     module.exports =st;
  }else{
     console.log("Not connected to internet");
     var st="Not connected to internet";
     module.exports =st;
  }
 });