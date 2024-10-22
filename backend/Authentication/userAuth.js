const jwt = require ("jsonwebtoken");
const {config} = require('dotenv');
config({path: './.env'});

const authenticateUserToken = (req, res, next) => {
try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];            //eg: Bearer token(will write token after a space)

    if (token == null) {
        return res.status(401).json({ message: "Authentication token required"});
    }

    const secretKey = process.env.SECRET_KEY;
        jwt.verify(token, secretKey, (err, user) => {
            if(err) {
                return res.status(403).json({ message: "Access Denied"})
            }
            req.user = user;
            next();
        })
} catch (error) {
    console.log('Some error in server authentication', error);
        return res.status(500).json({message: 'Internal Server Error!'})
}
};

module.exports = { authenticateUserToken }