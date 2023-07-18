const jwt = require('jsonwebtoken');
const VerifyToken = (req,res,next) =>
{
    
    try{
        const token = req.headers.authorization;
        jwt.verify(token,process.env.SECRET_CODE);
        next();

    }
    catch(err)
    {
        res.status(400).json("Not Authorized To Access...!!!");
    }
};

module.exports = VerifyToken ;