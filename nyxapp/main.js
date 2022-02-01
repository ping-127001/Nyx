const { app, BrowserWindow } = require('electron')

const Backend = require("./Handler/Backend.js");


app.whenReady().then(() => 
{
    createWindow();
    Backend.RequestData();
})

function createWindow () 
{
    const win = new BrowserWindow({
      width: 1000,
      height: 600,
      autoHideMenuBar: true, //hide menu bar
      icon: __dirname + './Images/Nyx.ico'
    })
    win.loadFile('index.html')
}