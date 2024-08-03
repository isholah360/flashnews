
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likeSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  post: { type: Schema.Types.ObjectId, ref: 'Post' },
});

likeSchema.index({ user: 1, post: 1 }, { unique: true });

const commentSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  post: { type: Schema.Types.ObjectId, ref: 'Post' },
  text: String,
  createdAt: { type: Date, default: Date.now },
});

const Like = mongoose.model('Like', likeSchema);
const Comment = mongoose.model('Comment', commentSchema);

module.exports = { Like, Comment };
