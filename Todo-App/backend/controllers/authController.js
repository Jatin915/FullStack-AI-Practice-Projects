const userModel = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signupUser = async (req,res) => {
    try {
        const {name, email, password} = req.body;
        if(!name || !email || !password){
            return res.status(400).json({
                message: "All fields are required"
            })
        }
        const existingUser = await userModel.findOne({ email });
    
        if(existingUser) {
            return res.status(400).json({
                message: "User already exists!"
            })
        }

        // password hashing
        const hashedPassword = await bcrypt.hash(password, 10);

        let newUser = await userModel.create({
            name,
            email,
            password: hashedPassword
        });

        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET);

        res.cookie("token", token);

        res.status(201).json({
            message: "User registered successfully"
        });
    } catch(err) {
        console.log("error singup user!")
        res.status(500).json({
            message: "Server error"
        });
    }
}


const loginUser = async (req,res) => {    
    try {
        const {email, password} = req.body;

        const user = await userModel.findOne({email});
    
        if(!user) {
            return res.status(403).json({
                message: "email or password is incorrect"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(403).json({
                message: "email or password is incorrect"
            })
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

        res.cookie("token", token);

        res.status(200).json({
            message: "Login successful"
        });

    } catch(err) {
        console.log("error login user!");
        res.status(500).json({
            message: "Server error"
        });
    }
}


const logoutUser = (req, res) => {
  res.clearCookie("token");

  res.status(200).json({
    message: "Logout successful"
  });
};

module.exports = {loginUser, signupUser, logoutUser};