const express = require('express');
const router = express.Router();

const fs = require('fs');
const path = require('path');

const PostManager = require('../actions/postManager');
let postManager = new PostManager();

// getting all the posts
router.get('/', (req, res) => {
	postManager.getAll((posts) => {
		if (posts.length === 0) {
			res.render('posts', { empty: true });
		} else {
			res.render('posts', { posts });
		}
	});
});

// getting a single post
router.get('/post_:id', (req, res) => {
	postManager.getById(
		req.params.id,
		(post) => res.render('post', { post }),
		() => res.sendStatus(404),
	);
});

// deleting a post
router.get('/post_:id/delete', (req, res) => {
	postManager.delete(
		req.params.id,
		() => res.redirect('/posts'),
		() => res.sendStatus(500),
	);
});

router.get('/post_:id/edit', (req, res) => {
	postManager.getById(
		req.params.id,
		(post) => res.render('edit', { post }),
		() => res.sendStatus(404),
	);
});

router.post('/post_:id/edit', (req, res) => {
	let blog = {
		id: req.params.id,
		title: req.body.title,
		description: req.body.description,
		author: req.body.author,
		post: req.body.post,
	};

	postManager.edit(req.params.id, blog, () => res.redirect('/posts'));
});

module.exports = router;

// random post - icon button
// search & sort
