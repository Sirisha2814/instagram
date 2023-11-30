const { useImperativeHandle } = require('react');
const Comment = require('../models/commentModel');
const asyncHandler = require('express-async-handler');

// Controller to fetch comments for a specific post
const getCommentsForPost = asyncHandler(async (req, res) => {
  try {
    const comments = await Comment.find({});
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Controller to add a comment to a post
const addComment = asyncHandler(async (req, res) => {
  try {
    const { user, text } = req.body;
    const newComment = new Comment({
      user,
      text,
    });
    const comment = await newComment.save();
    res.status(201).json(comment);
  } catch (error) {
    // res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = {
  getCommentsForPost,
  addComment,
};
