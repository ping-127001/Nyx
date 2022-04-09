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
        console.log(response);
        console.log(checkboxChecked);
      });
}

module.exports = 
{
    show
}