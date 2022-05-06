const ws = require('express-ws');

function Send(msg)
{
    try
    {
        ws.on('open', function open() 
        {
          ws.send(msg);
        });
    }
    catch (ex)
    {

    }
}

module.exports = 
{
    Send
}