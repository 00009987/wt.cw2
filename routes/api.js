const express = require('express');
const router = express.Router();

const PostManager = require('../actions/postManager');
const postManager = new PostManager();

router.get('/v1/posts', (req, res) => {
	const posts = postManager.getAll();
	res.json(posts);
});

module.exports = router;
