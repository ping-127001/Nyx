const { dialog } = require('electron')
  
function show(title, message)
{
    const options = 
    {
        title: title,
        message: message,
    };
    
      dialog.showMessageBox(null, options, (response, checkboxChecked) => 
      {
        
      });
}

module.exports = 
{
    show
}