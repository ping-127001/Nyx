const { app, BrowserWindow, Notification } = require('electron');

function show(title, body) 
{
    new Notification({ title: title, body: body }).show()
}

module.exports =
{
    show
}