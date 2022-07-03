const request=require("request");
const yargs=require("yargs");
var URL= "https://wwww.ipapi.co/";
// --ip"122.1.1.1"URL+ip+/json
// 1. --ip"122.1.1.1"
// 2. -i"122.1.1.1"

// URL+json
const argv=yargs.options({
                ip:{
                  describe:'IP Address to which you want to find Location',
                  alias:'i',
                  string:true
               }
})
.help()
.alias('help','h')
.argv;
if(argv.ip){
  URL+=argv.ip+"/json";    
} else{
  URL+="json";
           }
           request({
            url:URL,
           json:true
        },(err,response,body)=>{                   
           if(!err && response.statusCode == 200){
               console.log(body);
           }
          });