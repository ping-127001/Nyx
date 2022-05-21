const ip = require('ip');

const Data = require('../Data/AppData.json');

function defineClientString(length)
{
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) 
    {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
   Data.clientString = result;
}

function defineClientIp()
{
    Data.clientIp = ip.address();
}

module.exports = 
{
    defineClientString,
    defineClientIp
}