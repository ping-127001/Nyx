const request = require('request');

const Alert = require("../Handler/Alert.js");

let url = "https://raw.githubusercontent.com/ping-127001/Nyx/main/nyxBackend/backend.json";

let options = {json: true};

function RequestData()
{
    try
    {
        request(url, options, (error, res, json) => 
        {
            if (res.statusCode == 200) 
            {
                //read data using "json" + json value name
                console.log("Kill switch state: " + json.killswitch + " Version: " + json.version + " Debugging: " + json.debugging);
            };
        });
    }
    catch (ex)
    {
        Alert.show("Error", ex);
    }
}

module.exports =
{
    RequestData
}