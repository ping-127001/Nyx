const { app, BrowserWindow } = require('electron')

app.whenReady().then(() => 
{
    createWindow()
})

function createWindow () 
{
    const win = new BrowserWindow({
      width: 800,
      height: 600
    })
  
    win.loadFile('index.html')
}
