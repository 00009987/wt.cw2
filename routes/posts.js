const express = require('express');
const router = express.Router();
const PostManager = require('../actions/postManager');
const postManager = new PostManager();

router.get('/', (req, res) => {
	const posts = postManager.getAll();

	// rendering posts page
	res.render('posts', { posts });
});

router.get('/post_:id', (req, res) => {
	const post = postManager.getById(req.params.id);

	// rendering a single post page
	res.render('post', { post });
});

router.get('/post_:id/delete', (req, res) => {
	postManager.delete(req.params.id, (err) => {
		if (err) throw err;
	});

	res.redirect('/posts');
});

router.get('/post_:id/edit', (req, res) => {
	let post = postManager.getById(req.params.id);

	res.render('edit', { post });
});

router.post('/post_:id/edit', (req, res) => {
	const blog = {
		id: req.params.id,
		title: req.body.title,
		description: req.body.description,
		author: req.body.author,
		post: req.body.post,
	};

	postManager.edit(req.params.id, blog, (err) => {
		if (err) throw err;
	});

	res.redirect('/posts');
});

module.exports = router;

// random post - icon button
// search & sort
