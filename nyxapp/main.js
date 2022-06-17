const package = require("./package.json");

const { app, BrowserWindow, remote } = require('electron');

const { dialog } = require('electron');

const isOnline = require('is-online');

const fs = require('fs');

const Data = require("./Data/AppData.json");

const ClientDefiner = require('./Handler/ClientDefiner.js');

const Notification = require("./Handler/Notification.js");

const Alert = require("./Handler/Alert.js");

const Discord = require('./Handler/Discord.js');

const fstream = require('./Handler/fstream.js');

const pluginLoader = require("./Handler/pluginLoader.js");

const Socket = require("./Handler/Socket.js");

const Webhook = require("./Handler/Webhook.js");

var ipc = require('electron').ipcMain;

var path = require("path");

var link = "http://127.0.0.1:8080/";

var io = require("socket.io-client");

var socket = io.connect("http://127.0.0.1:8080/");

var Online;

var debugging = true


if (debugging) //you have survived the if statement cleansing, since you are just one lonely if statement. but do not test me, or you shall be eradicated.
{
  app.disableHardwareAcceleration(); //this gets it to stop logging about not supporting GL or something stupid like that
}

ClientDefiner.defineClientString(64);
ClientDefiner.defineClientIp();

app.whenReady().then(() =>
{
    checkInternet();
    //Wait for the variable to get updated
    setTimeout(() => 
    {
      switch (Online)
      {
        case true:
          createWindow();
          Discord.startDiscord();
          checkErrorLog();
          fstream.logError("balls");
          checkPlugins();
          Socket.Send("client_connected", `${Data.clientString},${Data.clientIp}`);
      
          socket.on("client_message", message => 
          {
            console.log(message);
          });
          ipc.on("close_application", () => 
          { 
            app.quit();
          });
          ipc.on("maximize_application", () => 
          {
            var window = BrowserWindow.getFocusedWindow();
            
            window.maximize();
          });
          ipc.on("minimize_application", () => 
          {
            var window = BrowserWindow.getFocusedWindow();
            
            window.minimize();
          });
          return;

        case false:
          offlineWindow();
          return;
      }
    }, 200);
});

app.on("quit", event => 
{
  socketDisconnect();
  Discord.Disconnect();
});

function createWindow()
{
    try
    {
      const win = new BrowserWindow({
        width: 1100,
        height: 790,
        titleBarStyle: "hidden",
        frame: false,
        autoHideMenuBar: true, //hide menu bar
        icon: __dirname + './Images/Nyx.ico',
        webPreferences:
        {
          devTools: false,
          preload: path.join(__dirname, "/Preload/preload.js")
        },
      })
      win.loadURL(link);
    }
    catch (ex)
    {
      fstream.logError(ex);
      //Notification.show("Nyx", "An error occured loading the window. " + ex)
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

async function checkInternet()
{
  Online = await isOnline();
  console.log(Online);
}

function socketDisconnect()
{
  Socket.Send("client_disconnect", JSON.stringify([Data.clientString, Data.clientIp]));
}

function checkErrorLog()
{
    var options = 
    {
      type: 'question',
      buttons: ['Yes', 'No'],
      defaultId: 0,
      title: 'Nyx',
      message: 'Do you want to enable error logging?',
    };

    dialog.showMessageBox(null, options).then( (data) => 
    {
      switch (data.response)
      {
        case 0:
          fstream.logging = true;
          return;

        case 1:
          fstream.logging = false;
          return;
      }
    })
}

function checkPlugins()
{
  // Add a delay so this popup will show, the two popups want to fight eachother
  setTimeout(() => 
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
      switch (data.response)
      {
        case 0:
          try
          {
            Discord.Update(`NyxApp ${package.version}`, "Plugins enabled");
            return;
          }
          catch (ex)
          {
            fstream.logError(ex);
            Alert.show("Nyx", "There was an error loading plugins. Your plugins will not be loaded Error: " + ex)
          }

          case 1:
            {
              Discord.Update(`NyxApp ${package.version}`, "Plugins disabled")
              return;
            }
      }
      })
  }, 2000);
}