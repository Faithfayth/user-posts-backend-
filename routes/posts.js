const express = require('express');

const { createPost, getPosts } = require('../controllers/post');

const auth = require('../middlewares/auth'); //importing the auth middleware to protect the routes that require authentication

const router = express.Router();

router.post('/', auth, createPost); //route to create a new post, which will call the createPost function in the post controller when a POST request is made to /

router.get('/', getPosts); //route to fetch all posts, which will call the getPosts function in the post controller when a GET request is made to /



module.exports = router; //exporting the router to be used in other parts of the application