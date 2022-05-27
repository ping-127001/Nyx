function loadPlugin(pluginName, pluginPath)
{
  try
  {
    var pluginName = require(pluginPath);
    pluginName.Start();
  }
  catch (ex)
  {
    console.log(ex);
  }
}

module.exports = 
{
    loadPlugin
}