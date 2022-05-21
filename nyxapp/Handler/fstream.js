const fs = require("fs");

const roamingDir = `C:${process.env.USER || ""}/AppData/Roaming/NyxData`;

function createFolder(dir)
{
    try
    {
        if (!fs.existsSync(dir)) 
        {
            fs.mkdirSync(dir, 
                {
                    recursive: true
                });
        }
        else return;
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
        if (!fs.existsSync(dir))
        {
            fs.mkdirSync(dir, 
                {
                    recursive: true
                });

            fs.writeFileSync(`${dir}/${name}.${extension}`, data);
        }
        else if (fs.existsSync(dir))
        {
            fs.writeFileSync(`${dir}/${name}.${extension}`, data);
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
        if (!fs.existsSync(roamingDir))
        {
            fs.mkdirSync(roamingDir, 
                {
                    recursive: true
                });
    
            fs.writeFileSync(`/Nyx/${name}.${extension}`, data)
        }
        else if (fs.existsSync(roamingDir))
        {
            fs.writeFileSync(`/Nyx/${name}.${extension}`, data)
        }
    }
    catch (ex)
    {
        console.log(`There was an error creating a config file ${name}.${extension} in ${dir} \n ${ex}`);
    }
}

module.exports =
{
    createFolder,
    createFile,
    createConfigFile
}