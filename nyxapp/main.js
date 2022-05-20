const { app, BrowserWindow} = require('electron');

const isOnline = require('is-online');

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

//checkInternet();
ClientDefiner.defineClientString(32);
ClientDefiner.defineClientIp();

app.whenReady().then(() =>
{

    createWindow();
    Socket.Send("new_msg", "Client connected");
    Discord.startDiscord();
  
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
      Alert.show("Error", ex);
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