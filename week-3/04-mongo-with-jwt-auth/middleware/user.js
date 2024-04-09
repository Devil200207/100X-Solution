const jwt = require('jsonwebtoken');
const jwtSecret = 'chandrachudchawan';

function userMiddleware(req, res, next) 
{
    const token = req.headers.authorization;
    const word = token.split(" ");
    const actualToken = word[1];
    
    try{
        const decodedValue = jwt.verify(actualToken, jwtSecret);
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

module.exports = userMiddleware;