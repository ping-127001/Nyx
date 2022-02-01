const request = require('request');

let url = "https://raw.githubusercontent.com/ping-127001/Nyx/main/nyxBackend/backend.json";

let options = {json: true};


function RequestData()
{
    console.log("Request Data function ran!");
    request(url, options, (error, res, body) => {
        if (error) {
            return  console.log(error)
        };
    
        if (!error && res.statusCode == 200) {
            // do something with JSON using "body" variable
        };
    });
}

module.exports =
{
    RequestData
}