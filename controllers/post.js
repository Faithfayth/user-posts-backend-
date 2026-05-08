//create post
//fetch all posts
//update a post
//delete a post
//CRUD operations for posts

const  Post = require('../models/post');

const createPost = async (req, res) => {
    const post = req.body;

    const newPost = new Post({...post, creator: req.userId, createdAt: new Date().toISOString()});

    try {
        await newPost.save();
        res.status(201).json({message: 'post created succeessfully', post: newPost});
    } catch (error) {
        res.status(500).json({message: 'Error while creating post', error: error.message});
    }
}



//FUNCION TO FETCH ALL POSTS
const getPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json({ message: 'Posts fecthed successfully', result: posts});
    } catch (error) {
        res.status(500).json({ message: 'error while fetchin posts', error: error.message});
    }
}





module.exports = { createPost, getPosts };

