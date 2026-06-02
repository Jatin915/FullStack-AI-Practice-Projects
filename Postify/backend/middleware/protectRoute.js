const jwt = require('jsonwebtoken');
const userModel = require('../models/User');

const protectRoute = async (req,res,next) => {
    try {

        const token = req.cookies.token;

        // No token
        if(!token) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        // verification
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find user
        const user = await userModel.findById(decoded.userId).select("-password");

        if(!user) {
            return res.status(401).json({
                message: "User not found"
            });
        }

        // Attach user to request
        req.user = user;
        next();

    } catch(error) {
        console.log(error);
        return res.status(401).json({
            message: "Invalid token"
        });
    }
};

module.exports = protectRoute;