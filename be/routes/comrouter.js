
const express = require("express");
const routers = express.Router();
const { readerLike, readComment, makeCommnet } = require("../controller/comcontroller");



routers.post('/:postId/like', readerLike)
routers.get('/:postId/comments', readComment)
routers.get('/:postId/comment', makeCommnet)

module.exports = { routers};