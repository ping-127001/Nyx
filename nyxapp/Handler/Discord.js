const client = require("discord-rich-presence")("962483669119930370");


const package = require("../package.json");

const exec = require('child_process').exec;

const electron = require('electron');
const dialog = electron.dialog;



const isRunning = (query, cb) => 
{
    let platform = process.platform;
    let cmd = '';
    switch (platform) 
    {
        case 'win32' : cmd = `tasklist`; break;
        case 'darwin' : cmd = `ps -ax | grep ${query}`; break;
        case 'linux' : cmd = `ps -A`; break;
        default: break;
    }
    exec(cmd, (err, stdout, stderr) => 
    {
        cb(stdout.toLowerCase().indexOf(query.toLowerCase()) > -1);
    });
}

function bypassError()
{
    dialog.showErrorBox = function(title, content)  // disable error dialog by overriding, for some reason Electron doesn't like my function even though its fine.
    {
        console.log(`${title}\n${content}`);
        console.clear();
    };
    //after further testing, i could not get it to give me an error anymore, but imma leave this here anyways.
}

function startDiscord()
{
    isRunning('discord.exe', (status) => 
    {
        if (status)
        {
            client.updatePresence
            ({
                state: 'Powered by electronjs',
                details: `NyxApp ${package.version}`,
                largeImageKey: 'nyx',
                largeImageText: "https://github.com/ping-127001/Nyx",
                instance: true,
              });
        }
        if (!status)
        {
            //client.disconnect();
        }
    })
}

function Update(details, state)
{
    isRunning('discord.exe', (status) => 
    {
        if (status)
        {
            client.updatePresence
            ({
                state: state,
                details: details,
                largeImageKey: 'nyx',
                largeImageText: "https://github.com/ping-127001/Nyx",
                instance: true,
              });
        }
        if (!status)
        {
            //client.disconnect();
        }
    })
}

function Disconnect()
{
    client.disconnect();
}


module.exports =
{
    isRunning,
    startDiscord,
    Update,
    Disconnect
}