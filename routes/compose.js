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

	postManager.create(blog, (err) => {
		if (err) throw err;
	});

	res.redirect('/compose');
});
module.exports = router;
