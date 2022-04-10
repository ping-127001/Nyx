const ws = require('ws');

function send(url, data)
{
    ws.on('open', function open() 
    {
        if (/checkStatusCode/.test(url)) 
        {
            if (done) 
            {
                return;
            }
            done = true;
            callback && callback('checkStatusCode');
            exit();
        } 
        else 
        {
            ws.send(data);
        }
       });
}

module.exports =
{
    send
}