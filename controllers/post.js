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



//FUNCTION TO UPDATE A POST. 1.fetch the post, using the url for passing the id of the post to be updated. 2.update the post with the new data passed in the request body. 3.return the updated post in the response.
const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    try {
        const existingPost = await Post.findById(id);

        if (!existingPost) {
            return res.status(404).json({ message: 'Post not found' });
        }

        if(req.userId !== existingPost.creator) {
            return res.status(403).json({ message: 'Unauthorized access, you are not the owner of this post'})
        }

        existingPost.title = title;
        existingPost.content = content;
        await existingPost.save();

        res.status(200).json({ message: 'Post updated successfully', post: existingPost });
    } catch (error) {
        res.status(500).json({ message: 'Error while updating post', error: error.message });
    }
}



module.exports = { createPost, getPosts, updatePost };

