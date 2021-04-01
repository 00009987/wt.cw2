const express = require('express');
const router = express.Router();
const PostManager = require('../actions/postManager');
const postManager = new PostManager();

// rendering the compose page
router.get('/', (req, res) => res.render('compose'));

// posting the user request
router.post('/', (req, res) => {
	// declearing and initializing object consist of user inputs
	const blog = {
		title: req.body.title,
		description: req.body.description,
		author: req.body.author,
		post: req.body.post,
	};

	// checking if any input fields were empty
	if (
		blog.title.trim() === '' ||
		blog.description.trim() === '' ||
		blog.author.trim() === '' ||
		blog.post.trim() === ''
	) {
		res.render('compose', { error: true });
	} else {
		// if not, add the post to the db
		postManager.create(blog, () => res.render('compose', { success: true }));
	}
});

module.exports = router;
