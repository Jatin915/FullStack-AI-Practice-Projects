const jwt = require('jsonwebtoken');

const authMiddleware = (req,res,next) => {
    try {
        
        const token = req.cookies.token;
        
        if(!token) {
            return res.status(401).json({
                message: "Access denied! No token provided."
            });
        }

        const decoded = jwt.verify(token, "secretToken");

        req.userId = decoded.userId;
        
        next();

    } catch(err) {
        return res.status(401).json({
            message: "Invalid or expire token"
        });
    }
}

module.exports = authMiddleware;