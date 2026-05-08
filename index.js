const express = require('express'); //importing the Express framework to create a web server

const connectDB = require('./db'); //importing the connectDB function from the db.js file to establish a connection to the MongoDB database

require('dotenv').config(); //loading environment variables from a .env file into process.env, allowing us to use environment variables in our application

const userRoutes = require('./routes/users'); //importing the user routes from the routes/user.js file to handle user-related API endpoints
const postRoutes = require('./routes/posts'); //importing the post routes from the routes/post.js file to handle post-related API endpoints

const app = express();
app.use(express.json()); //middleware to parse incoming JSON requests, allowing us to access the request body as req.body

app.get('/', (req, res) => {
    res.send('Welcome to the User Posts Backend!');  //creating a route
});


//user routes
app.use('/users', userRoutes); //using the user routes for any requests that start with /users, so that we can handle user registration and login

//post routes
app.use('/posts', postRoutes); //using the post routes for any requests that start with /posts, so that we can handle post-related operations

const PORT = process.env.PORT || 3000;  //setting up the port for the server to listen on, using an environment variable or defaulting to 3000

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

// now we have to connect the database
connectDB();