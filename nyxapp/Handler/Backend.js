const request = require('request');

let url = "https://raw.githubusercontent.com/ping-127001/Nyx/main/nyxBackend/backend.json";

let options = {json: true};


function RequestData()
{
    console.log("Request Data function ran!");
    request(url, options, (error, res, json) => 
    {
        if (error) 
        {
            return  console.log("An error occured. Error: " + error)
        };
    
        if (!error && res.statusCode == 200) 
        {
            //read data using "json" + json value name
            console.log("Kill switch state: " + json.killswitch);
        };
    });
}

module.exports =
{
    RequestData
}