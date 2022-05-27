const { app, BrowserWindow} = require('electron');

const isOnline = require('is-online');

const fs = require('fs');

const Data = require("./Data/AppData.json");

const ClientDefiner = require('./Handler/ClientDefiner.js');

const Popup = require("./Handler/Popup.js");

const Alert = require("./Handler/Alert.js");

const Discord = require('./Handler/Discord.js');

const fstream = require('./Handler/fstream.js');

const Socket = require("./Handler/Socket.js");

const Webhook = require("./Handler/Webhook.js");

var link = "http://127.0.0.1:8080/";

var io = require("socket.io-client");

var socket = io.connect("http://127.0.0.1:8080/");

var Online;

var debugging = false

if (debugging)
{
  app.disableHardwareAcceleration();
  //this gets it to stop logging about not supporting GL or something stupid like that
}


setPluginLocation();
loadPlugin("example");
//checkInternet();
ClientDefiner.defineClientString(64);
ClientDefiner.defineClientIp();

app.whenReady().then(() =>
{

    createWindow();
    Socket.Send("client_connected", `${Data.clientString},${Data.clientIp}`);
    Discord.startDiscord();
    //loadPlugin("example", "./Handler/Plugins/examplePlugin.js");
    socket.on("client_message", message => 
    {
      console.log(message);
    });
  
  //if (Online)
  //{
    //createWindow();
    //Socket.Send("new_msg", "Client connected");
   // Discord.startDiscord();
  //}
  //else if (!Online)
 // {
  //  offlineWindow();
  //}
})

app.on("quit", event => 
{
  socketDisconnect();
});

function createWindow()
{
    try
    {
      const win = new BrowserWindow({
        width: 1000,
        height: 600,
        autoHideMenuBar: true, //hide menu bar
        icon: __dirname + './Images/Nyx.ico',
        webPreferences:
        {
          devTools: false
        },
      })
      win.loadURL(link);
    }
    catch (ex)
    {
      //Popup.show("Nyx", "An error occured loading the window. " + ex)
    }
}

function offlineWindow()
{
  try
  {
    const win = new BrowserWindow({
      width: 1000,
      height: 600,
      autoHideMenuBar: true, //hide menu bar
      icon: __dirname + './Images/Nyx.ico',
      webPreferences:
      {
        devTools: false
      },
    })
    win.loadFile('./html/offline.html');
  }
  catch (ex)
  {
    Alert.show("Error", ex);
  }
}

function recieveWebHooks()
{
  io.on("connection", (socket) =>
  {
    socket.on("new_msg", (data) => 
    {
      console.log(data);
      Webhook.error = data;
   });
  });
}

async function checkInternet()
{
  Online = await isOnline();
  console.log(Online);
}

function socketDisconnect()
{
  Socket.Send("client_disconnect", JSON.stringify([Data.clientString, Data.clientIp]));
}



//ALL PLUGIN SHIT GOES BELOW//

//ok this is really gay, i tried to just rewrite my command handler for my discord bot but i forgot that it uses the discord client and uses their collection// (btw the code i was modifying is from https://github.com/ping-127001/PornValley/blob/main/bot.js)
//maybe steal the client collection thing from discord.js..? the "client" could be renamed to PluginManager or something like that?//
function setPluginLocation()
{

  try
  {
    const pluginFiles = fs.readdirSync('./Plugins').filter(file => file.endsWith('.js'));
    for (const file of pluginFiles)
    {
      const plugin = require(`./Plugins/${file}`);
      plugin.set(plugin.name, plugin);
    }
  }
  catch (ex)
  {
    console.log("There was an error setting the plugins location " + ex);
  }
}

function loadPlugin(pluginName)
{
  try
  {
    const plugin = plugin.get(pluginName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(pluginName))
    if (plugin) 
    {
      plugin.get(command.name).execute(message, args, client);
    }
  }
  catch (ex)
  {

  }
}