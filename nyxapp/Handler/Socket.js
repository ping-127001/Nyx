const Alert = require("../Handler/Alert.js");

var io = require("socket.io-client");

var socket = io.connect("http://127.0.0.1:8080/");

function Send(name, msg)
{
    try
    {
      socket.emit(name, msg);
    }
    catch (ex)
    {
      Alert.show("Error", ex);
    }
}

module.exports =
{
    Send
}
