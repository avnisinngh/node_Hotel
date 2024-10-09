const jwt = require('jsonwebtoken');

const jwtAuthMiddleware = (req, res, next)=> {

    //first check if request header has authorization or not
    const authorization = req.headers.authorization
    if(!authorization) return ress.status(401).json({error: 'Token not found'});
    //extract the jwt from the request headers
    const token = req.headers.authorization.split(' ')[1];
    if(!token) return res.status(401).json({error: 'Unauthorized'});
    try{
        //verify the JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //Attach user information to the request object
        req.user = decoded
        next();
    }catch(err) {
        console.log(err);
        res.status(401).json({error: 'Invalid token'});
    }
}

//function to generate token
const generateToken = (userData) =>{
    //generate a new JWT token using the user data
    return  jwt.sign(userData, process.env.JWT_SECRET,{expiresIn: 3000000});
}

module.exports = {jwtAuthMiddleware, generateToken}