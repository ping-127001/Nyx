const { app, BrowserWindow, Notification } = require('electron');

function show(title, body) 
{
    new Notification({ icon: '../Images/nyx.png', title: title, body: body,}).show()
}

module.exports =
{
    show
}