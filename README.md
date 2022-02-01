# Nyx
Repo for all things related to Nyx, Nyx website, Nyx Electron App

# Debugging Nyx
* Install electron: npm install --save-dev electron
* npm start

# Adding a node_module
Having issues? Try these solutions
* npm install --save-dev electron-rebuild
* Not working? try this: .\node_modules\.bin\electron-rebuild.cmd

# Node_Modules used
* axios
* request

# Electron 
* [Electron QuickStart](https://www.electronjs.org/docs/v14-x-y/tutorial/quick-start)

# Electron Console Logging
You will notice if you try to log something in a js file that it will log in your ide, not the app, here is the solution to print in the app:
<br>
**console.log works, but where it logs to depends on whether you call it from the main process or the renderer process. If you call it from the renderer process (i.e. JavaScript that is included from your index.html file) it will be logged to the dev tools window. If you call it from the main process (i.e. in main.js) it will work the same way as it does in Node - it will log to the terminal window. If you're starting your Electron process from the Terminal using electron . you can see your console.log calls from the main process there.**
