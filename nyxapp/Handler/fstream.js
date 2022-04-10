const fs = require("fs");

function createFolder(dir)
{
    if (!fs.existsSync(dir)) 
    {
        fs.mkdirSync(dir, 
            {
            recursive: true
            });
        }
}

function createFile(location, name, extension, data)
{
    fs.writeFileSync(`/${location}${name}.${extension}`, data)
}

function createConfigFile(name, extension, data)
{
    fs.writeFileSync(`/Nyx/${name}.${extension}`, data)
}

module.exports =
{
    createFolder,
    createFile,
    createConfigFile
}