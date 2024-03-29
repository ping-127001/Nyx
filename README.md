# Nyx
Repo for things related to the Nyx Client

# Code-Style
* All curly braces should be on it's own line
```js
if (true)
{
	while (true)
	{
		
	}
}

switch (var)
{
  case true:
   return;
}
```
* Instead of this
```js
if (true) {

	while (true) {
	
	}
}

switch (var) {
  case true:
   return;
}
```

# Switch statements
If you are writing more then one if statement, try to use a switch statement to help perfomance as Javascript is sort of slow. If you are not very good at switch statements thats alright, a developer will rewrite it for you and then merge the code

# Debugging Nyx
* Make sure you are in the nyxapp directory, NOT \Nyx
* Install electron: npm install --save-dev electron
* npm start
* Make sure you are using the packages json provided, it has the information required for Electron

# Developing Plugins
Interested in making Plugins? Follow these steps
* Create a Javascript file in /Plugins
* Import this code : 
```js
function Start()
{
    //execute code
}

module.exports = 
{
    Start
}
```
* To load your Plugin, go to Main.js and use pluginLoader.loadPlugin
* The paramaters for loadPlugin are pluginName, and fileName, which would be the file name of the plugin and also data, you can now pass data to your Plugin example with data parameter:
```js
pluginLoader.loadPlugin("example", "example.js", "parameter here");
```
example without parameter:
```js
pluginLoader.loadPlugin("example", "example.js");
```

# Adding a node_module
Having issues after installing a module? Try these solutions
* npm install --save-dev electron-rebuild
* Not working? try this: .\node_modules\.bin\electron-rebuild.cmd

# Node_Modules used
* socket.io
* axios
* request
* ip
* bcrypt
* discord-rich-presence (requires you to have GIT installed to download the package)

# Electron 
* [Electron QuickStart](https://www.electronjs.org/docs/v14-x-y/tutorial/quick-start)

# Compile Nyx
* Install electron-packager
```js
 npm install electron-packager
```
* Execute this command
```js
 npx electron-packager <sourceDirectory> Nyx --platform=win32
```

# Electron Console Logging
You will notice if you try to log something in a js file that it will log in your IDE, not the app, here is the solution to print in the app:
<br>
**console.log works, but where it logs to depends on whether you call it from the main process or the renderer process. If you call it from the renderer process (i.e. JavaScript that is included from your index.html file) it will be logged to the dev tools window. If you call it from the main process (i.e. in main.js) it will work the same way as it does in Node - it will log to the terminal window. If you're starting your Electron process from the Terminal using electron . you can see your console.log calls from the main process there.**

## Licensing 
Permissions
* ✔️ Commercial use
* ✔️ Modification
* ✔️ Distribution
* ✔️ Private use
<br></br>

Conditions
* ❕ License and copyright notice
* ❕ State changes
* ❕ Disclose source
* ❕ Same license
<br></br>

Limitations
* ❌ Liability
* ❌ Warranty
<br></br>

License being used is: **GNU General Public License v2.0 license**
