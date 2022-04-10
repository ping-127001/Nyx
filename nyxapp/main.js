const { app, BrowserWindow} = require('electron');

const Backend = require("./Handler/Backend.js");

const Env = require("./Handler/Env.js");

const Popup = require("./Handler/Popup.js");

const Alert = require("./Handler/Alert.js");

const Discord = require('./Handler/Discord.js');

const fstream = require('./Handler/fstream.js');

const Websocket = require('./Handler/Websocket.js');

const link = "http://127.0.0.1:8080/";

var debugging = true

if (debugging)
{
  app.disableHardwareAcceleration();
  //this gets it to stop logging about not supporting GL or something stupid like that
}

app.whenReady().then(() =>
{
    createWindow();
    Discord.startDiscord();
})

function createWindow ()
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
        }
      })
      //win.loadFile('./html/home.html'); //used for local files
      win.loadURL(link);
    }
    catch (ex)
    {
      Alert.show("Error", ex);
    }
}