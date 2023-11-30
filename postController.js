const Post = require('../models/postModel');
const asyncHandler = require('express-async-handler');

const createPost = asyncHandler(async (req, res) => {
        const { title, description, time } = req.body;
        const user = req.user; 
        if (!title || !description || !time) {
          throw new Error("Please include all fields");
        }
        const existingPost = await Post.findOne({title});
        if (existingPost) {
            throw new Error("Title already exists");
        }
      try{
        const newPost = new Post({ title, description, time, user: user._id });
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (error) {
        res.status(400).json({ error:error.message});
    }
});

// Controller to get all posts
const getAllPosts = asyncHandler(async (req, res) => {
    try {
        const posts = await Post.find({});
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: "invalid data" });
    }
});

module.exports = {
    createPost,
    getAllPosts,
};
