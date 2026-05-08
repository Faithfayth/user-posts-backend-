//we shall make this middleware to check if the user is authenticated or not before allowing them to create, update or delete posts
//make use of the created tokens, have to make sure the token is still valid and not expired, and if valid, we can allow the user to proceed with the requested action

const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {

    try {
        const token = req.headers.authorization.split(" ")[1]; //have to get the token from the authorization header, which is usually in the format "Bearer <token>"
        
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized access, token is missing'});
        }
        
        let decodedData;

        decodedData = jwt.verify(token, process.env.JWT_SECRET); //have to verify the token using the secret key, which will decode the token and give us the user data
        req.userId = decodedData.id;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized access, invalid token', error: error.message });
    }
}

module.exports = auth;
