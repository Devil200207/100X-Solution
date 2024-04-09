const jsonwebtoken = require('jsonwebtoken');
const jwtSecret = 'chandrachudchawan';

function adminMiddleware(req, res, next) 
{
    const token = req.header.authorization;
    const word = token.split(' ');
    const actualToken = word[1];
    
    try{
        const decodedValue = jsonwebtoken.verify(actualToken, jwtSecret);
        if(decodedValue.username){
            next();
        }
        else{
            res.status(403).json({
                msg: "You are not authenticated"
            })
        }
    }
    catch (e)
    {
        res.json({
            msg:"Incorrect inputs"
        })
    }
    
}

module.exports = adminMiddleware;