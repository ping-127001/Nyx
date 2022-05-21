const bcrypt = require('bcrypt');
const saltRounds = 10;

function hashText()
{
    bcrypt.genSalt(text, saltRounds, function(err, salt) 
    {
        bcrypt.hash(myPlaintextPassword, salt, function(err, hash) 
        {
            
        });
    });
}

module.exports = 
{

}