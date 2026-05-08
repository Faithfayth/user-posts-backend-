const express = require('express');

//have to import the controllers we created for the user routes
const {register, login} = require('../controllers/user');

const router = express.Router();

router.post('/register', register); //have to create a route for user registration, which will call the register function in the user controller when a POST request is made to /register

router.post('/login', login); //have to create a route for user login, which will call the login function in the user controller when a POST request is made to /login

module.exports = router; //have to export the router to be used in other parts of the application