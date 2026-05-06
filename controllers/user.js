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

    
}

module.exports = { register };
// Here you would typically add code to validate the input, hash the password, and save the user to the database
    // For example:
    // const hashedPassword = await bcrypt.hash(password, 10);
    // const newUser = new User({ name, email, password: hashedPassword });
    // await newUser.save();