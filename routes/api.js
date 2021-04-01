const express = require('express');
const router = express.Router();

const PostManager = require('../actions/postManager');
const postManager = new PostManager();

// sending all the posts to the request
router.get('/v1/posts', (req, res) => {
	postManager.getAll((posts) => res.json(posts));
});

module.exports = router;
