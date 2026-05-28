const userModel = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

// Signup controller
const signup = async (req,res) => {
    try {
        const { username, email, password } = req.body;

        //validation
        if(!username || !email || !password) {
            return res.status(400).json({
                message: "All fields are required!"
            });
        }

        // Existing user check
        const existingUser = await userModel.findOne({email});

        if(existingUser) {
            return res.status(400).json({
                message: "User already exists!"
            });
        }

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = await userModel.create({
            username,
            email: email.replace(/\s+/g, ""),
            password: hashedPassword
        });

        // Generate token
        const token = generateToken(newUser._id);

        // Store cookie
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        // Response
        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email
            }
        });


    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: "Server Error"
        });
    }
}

// Login controller
const login = async (req, res) => {
    try {
        let { email, password } = req.body;

        // Sanitize email
        email = email.replace(/\s+/g, "").toLowerCase();

        // Validation
        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        // Find user
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }

        // Generate token
        const token = generateToken(user._id);

        // Store cookie
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        // Response
        res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server Error"
        });
    }
};

module.exports = { signup, login };