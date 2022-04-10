# Nyx
Repo for all things related to Nyx, Nyx website, Nyx Electron App

# Starting the Serverside for debugging locally
* cd nyxapp + cd Serverside
* node index.js (this is only if you have access to the Serverside)

# Debugging Nyx
* Make sure you are in the nyxapp directory, NOT \Nyx. cd nyxapp!
* Install electron: npm install --save-dev electron
* npm start
* Make sure you are using the packages json provided, it has the information required for Electron

# Adding a node_module
Having issues after installing a module? Try these solutions
* npm install --save-dev electron-rebuild
* Not working? try this: .\node_modules\.bin\electron-rebuild.cmd

# Node_Modules used
* axios
* request
* discord-rich-presence

# Electron 
* [Electron QuickStart](https://www.electronjs.org/docs/v14-x-y/tutorial/quick-start)

# Electron Console Logging
You will notice if you try to log something in a js file that it will log in your IDE, not the app, here is the solution to print in the app:
<br>
**console.log works, but where it logs to depends on whether you call it from the main process or the renderer process. If you call it from the renderer process (i.e. JavaScript that is included from your index.html file) it will be logged to the dev tools window. If you call it from the main process (i.e. in main.js) it will work the same way as it does in Node - it will log to the terminal window. If you're starting your Electron process from the Terminal using electron . you can see your console.log calls from the main process there.**

