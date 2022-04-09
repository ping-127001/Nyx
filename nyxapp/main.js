const { app, BrowserWindow} = require('electron');

const Backend = require("./Handler/Backend.js");

const Env = require("./Handler/Env.js");

const Popup = require("./Handler/Popup.js");

const Alert = require("./Handler/Alert.js");

app.whenReady().then(() =>
{
    createWindow();
    Backend.RequestData();
    //Popup.show("Example", "Test");
    //Alert.show("Example", "This is an alert");
})

function createWindow ()
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
    win.loadFile('./html/home.html');
}