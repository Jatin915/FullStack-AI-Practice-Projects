const express = require('express');
const router = express.Router();

const {loginUser, signupUser} = require('../controllers/authController');

router.post('/signup', signupUser);

router.post('/login', loginUser);