const { time, dir } = require("console");

const fs = require("fs");

var os = require('os');

const roamingDir = `C:/Users/${os.userInfo().username}/AppData/Roaming/NyxData`;

var folderExists = false;

function createFolder(dir)  //this also gets used to make sure the folder exists, used in alot of the functions below
{
    try
    {
        switch (fs.existsSync(dir))
        {
            case false:
                fs.mkdirSync(dir, 
                    {
                        recursive: true
                    });
                return;
        }
    }
    catch (ex)
    {
        console.log(`There was an error creating a folder in ${dir} \n ${ex}`);
    }
}

function createFile(dir, name, extension, data)
{
    try
    {
        switch (fs.existsSync(dir))
        {
            
            case false:
                fs.mkdirSync(dir, 
                    {
                        recursive: true
                    });
    
                fs.writeFileSync(`${dir}/${name}.${extension}`, data);
                return;
        }
    }
    catch (ex)
    {
        console.log(`There was an error creating ${name}.${extension} in ${dir} \n ${ex}`);
    }
}

function createConfigFile(name, extension, data)
{
    try
    {

        switch (process.platform)
        {
            case "linux":
                const home = process.env.HOME;
                var linuxRoaming = `${home}/.NyxData`;
                createFolder(linuxRoaming);
                fs.writeFileSync(`${linuxRoaming}/${name}.${extension}`, data);
                return;

            case "win32":
                createFolder(roamingDir);
                fs.writeFileSync(`${roamingDir}/${name}.${extension}`, data);
        }
    }
    catch (ex)
    {
        console.log(`There was an error creating a config file ${name}.${extension} in ${roamingDir} \n ${ex}`);
    }
}

function logError(error)
{
    try
    {
        switch (process.platform)
        {
            case "linux":
                const home = process.env.HOME;
                var linuxRoaming = `${home}/.NyxData`;
                var date = new Date().toISOString().slice(0, 10);
                createFolder(linuxRoaming);
                fs.writeFileSync(`${linuxRoaming}/error.log`, `${date} ` + `Error: ${error}`);
                return;
                
                case "win32":
                    createFolder(roamingDir);
                    var date = new Date().toISOString().slice(0, 10);
                    fs.writeFileSync(`${roamingDir}/error.log`, `${date} ` + `Error: ${error}`);
                    return;
                }
                return;
        }
        catch (ex)
        {
            console.log("There was an error writing to the error log. " + ex);
        }
}

function checkFolderExists(dir)
{
    switch (fs.existsSync(dir))
    {
        case true:
            folderExists = true;
            return;

        case false: 
            folderExists = false;
            return;
    }
}

module.exports =
{
    createFolder,
    createFile,
    createConfigFile,
    logError,
    checkFolderExists,
    folderExists,
    roamingDir,
}