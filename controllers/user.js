const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const register = async (req, res) => {
    // Implementation for user registration
    const {name, email, password, confirmPassword} = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        } 

        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();

        //now have to create a token for the user, so that they can be authenticated in future requests
        const token = jwt.sign({id: newUser._id, email: newUser.email}, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.status(201).json({ message: 'User created successfully', result: newUser, token});



    }catch (error) {
       res.status(500).json({ message: 'Error while registering user', error: error.message }); 
    }

 // Here you would typically add code to validate the input, hash the password, and save the user to the database
    // For example:
    // const hashedPassword = await bcrypt.hash(password, 10);
    // const newUser = new User({ name, email, password: hashedPassword });
    // await newUser.save();
    
    //assignment to create an auto generate function (frontend)
}







//THE LOGIN FUNCTION , ............BUT IT WILL BE SIMILAR TO THE REGISTER FUNCTION, EXCEPT THAT INSTEAD OF CREATING A NEW USER, IT WILL CHECK IF THE USER EXISTS AND IF THE PASSWORD IS CORRECT, THEN GENERATE A TOKEN FOR THE USER TO AUTHENTICATE FUTURE REQUESTS.
const login = async (req, res) => {
    const {email, password} = req.body;

    try {
        const existingUser = await User.findOne({ email }); //have to find the user in the database using the email provided in the request body
    
        if (!existingUser) {
            return res.status(404).json({ message: 'User not found, please register first' });
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password); //compare the provided password with the hashed password stored in the database
        
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'The password is incorrect' });
        }

        const token = jwt.sign({id: existingUser._id, email: existingUser.email}, process.env.JWT_SECRET, {expiresIn: '1h'}); //generate a token for the user to authenticate future requests

        res.status(200).json({ message: 'User logged in successfully', result: { name: existingUser.name, email: existingUser.email }, token }); //send the token back to the client
    } catch (error) {
        res.status(500).json({ message: 'Error while logging in user', error: error.message });
    }
}















module.exports = { register, login};
