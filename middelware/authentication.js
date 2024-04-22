// middleware/authenticate.js
const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token || !token.startsWith('Bearer ')) {
        return res.status(401).send('Authentication failed: invalid token');
    }
    try {
        const tokenData = token.split(' ')[1];
        const decodedToken = jwt.verify(tokenData, process.env.JWT_SECRET);
        req.userId = decodedToken._id;
        next();
    } catch (error) {
        return res.status(401).send('Authentication failed: invalid token');
    }
};

const allowOnlyAuthenticated = (req, res, next) => {
    if (!req.userId) {
        return res.status(401).send('Access denied: authentication required');
    }
    next();
};

module.exports = { authenticate, allowOnlyAuthenticated };
