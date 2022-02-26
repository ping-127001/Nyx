const request = require('request');

let url = "https://raw.githubusercontent.com/ping-127001/Nyx/main/nyxBackend/backend.json";

let options = {json: true};


function RequestData()
{
    request(url, options, (error, res, json) => 
    {
        if (error) 
        {
            return  console.log("An error occured. Error: " + error)
        };
    
        if (!error && res.statusCode == 200) 
        {
            //read data using "json" + json value name
            console.log("Kill switch state: " + json.killswitch + " Version: " + json.version + " Debugging: " + json.debugging);
        };
    });
}

module.exports =
{
    RequestData
}