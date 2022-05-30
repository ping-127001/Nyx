const { app, BrowserWindow} = require('electron');

const { dialog } = require('electron');

const isOnline = require('is-online');

const fs = require('fs');

const Data = require("./Data/AppData.json");

const ClientDefiner = require('./Handler/ClientDefiner.js');

const Popup = require("./Handler/Popup.js");

const Alert = require("./Handler/Alert.js");

const Discord = require('./Handler/Discord.js');

const fstream = require('./Handler/fstream.js');

const pluginLoader = require("./Handler/pluginLoader.js");

const Socket = require("./Handler/Socket.js");

const Webhook = require("./Handler/Webhook.js");

var link = "http://127.0.0.1:8080/";

var io = require("socket.io-client");

var socket = io.connect("http://127.0.0.1:8080/");

var Online;

var debugging = true

if (debugging)
{
  app.disableHardwareAcceleration();
  //this gets it to stop logging about not supporting GL or something stupid like that
}

ClientDefiner.defineClientString(64);
ClientDefiner.defineClientIp();

app.whenReady().then(() =>
{
    createWindow();
    Discord.startDiscord();
    checkPlugins();
    Socket.Send("client_connected", `${Data.clientString},${Data.clientIp}`);
    socket.on("client_message", message => 
    {
      console.log(message);
    });
});

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

function checkPlugins()
{
  var options = 
  {
    type: 'question',
    buttons: ['Yes', 'No'],
    defaultId: 0,
    title: 'Nyx',
    message: 'Do you want to load Plugins?',
  };
  
  dialog.showMessageBox(null, options).then( (data) => 
  {
      if (data.response == 0)
      {
        try
        {
          pluginLoader.loadPlugin("example", "../Plugins/examplePlugin.js");
          Popup.show("Nyx", "Succuessfully loaded all plugins");
        }
        catch (ex)
        {
          Alert.show("Nyx", "There was an error loading plugins. Your plugins will not be loaded Error: " + ex)
        }
      }
      else
      {
        return;
      }
    })
}