const { app, BrowserWindow } = require('electron');

const Backend = require("./Handler/Backend.js");

const Env = require("./Handler/Env.js");

app.whenReady().then(() =>
{
    createWindow();
    Backend.RequestData();
    Env.getVersion();
})

function createWindow ()
{
    const win = new BrowserWindow({
      width: 1000,
      height: 600,
      autoHideMenuBar: true, //hide menu bar
      icon: __dirname + './Images/Nyx.ico'
    })
    win.setBackgroundColor('#63728a'); //set bg
    win.loadFile('index.html');
}