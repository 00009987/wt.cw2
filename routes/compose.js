const express = require('express');
const router = express.Router();
const PostManager = require('../actions/postManager');
const postManager = new PostManager();

// compose page
router.get('/', (req, res) => res.render('compose'));

router.post('/', (req, res) => {
	const blog = {
		title: req.body.title,
		description: req.body.description,
		author: req.body.author,
		post: req.body.post,
	};

	if (
		blog.title.trim() === '' ||
		blog.description.trim() === '' ||
		blog.author.trim() === '' ||
		blog.post.trim() === ''
	) {
		res.render('compose', { error: true });
	} else {
		postManager.create(blog, (err) => {
			if (err) throw err;
		});

		res.render('compose', { success: true });
	}
});

module.exports = router;
