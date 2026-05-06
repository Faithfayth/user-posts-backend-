const express = require('express'); //importing the Express framework to create a web server

const connectDB = require('./db'); //importing the connectDB function from the db.js file to establish a connection to the MongoDB database

require('dotenv').config(); //loading environment variables from a .env file into process.env, allowing us to use environment variables in our application

const app = express();

app.get('/', (req, res) => {
    res.send('Welcome to the User Posts Backend!');  //creating a route
})


const PORT = process.env.PORT || 3000;  //setting up the port for the server to listen on, using an environment variable or defaulting to 3000

app.listen(PORT, () => {
    console.log(`Server is running at https://localhost:${PORT}`);
});

// now we have to connect the database
connectDB();