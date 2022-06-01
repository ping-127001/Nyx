function loadPlugin(pluginName, pluginPath, data) //you can pass data into the plugin loader for plugins that use a paramter, if no paramter is needed you can just leave it blank
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