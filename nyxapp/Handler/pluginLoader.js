function loadPlugin(fileName, data) //you can pass data into the plugin loader for plugins that use a paramter, if no paramter is needed you can just leave it empty
{
  try
  {
    var pluginName = require('../Plugins/' + fileName + '.js');
    pluginName.Start(data);
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