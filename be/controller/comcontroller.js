// routes/likes.js
const express = require('express');
const router = express.Router();
const Like = require('../db/comment');
const Comment = require('../db/comment');
const Post = require("../db/posts");

const readerLike = async (req, res) => {
  const postId = req.params.postId;
  const userId = req.body.userId;

  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).send('Post not found');

    const existingLike = await Like.findOne({ user: userId, post: postId });
    if (existingLike) {
      await existingLike.remove();
    } else {
      const like = new Like({ user: userId, post: postId });
      await like.save();
    }

    const likeCount = await Like.countDocuments({ post: postId });
    res.json({ likes: likeCount });
  } catch (error) {
    res.status(500).send(error.message);
  }
}


const makeCommnet = async (req, res) => {
    const postId = req.params.postId;
    const { userId, text } = req.body;
  
    try {
      const post = await Post.findById(postId);
      if (!post) return res.status(404).send('Post not found');
  
      const comment = new Comment({ user: userId, post: postId, text });
      await comment.save();
      res.json(comment);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
  
 const readComment = async (req, res) => {
    const postId = req.params.postId;
  
    try {
      const comments = await Comment.find({ post: postId }).populate('user', 'username');
      res.json(comments);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

module.exports ={readerLike, readComment, makeCommnet}
