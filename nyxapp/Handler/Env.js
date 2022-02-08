var pjson = require('../package.json');

function cls(max)
{
    console.clear();
}

function getVersion()
{
    console.log(pjson.name + " version = " + pjson.version);
}

module.exports =
{
    cls,
    getVersion
}