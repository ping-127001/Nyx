const { app, BrowserWindow, Notification } = require('electron');

function show(title, body) 
{
    NOTIFICATION_TITLE = title;
    NOTIFICATION_body = body;
    new Notification({ title: title, body: body }).show()
}

module.exports =
{
    show
}