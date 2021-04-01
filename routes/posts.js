const express = require('express');
const router = express.Router();

const PostManager = require('../actions/postManager');
let postManager = new PostManager();

// getting all the posts
router.get('/', (req, res) => {
	postManager.getAll((posts) => {
		if (posts.length === 0) {
			// if the db is empty, showing a corresponding message
			res.render('posts', { empty: true });
		} else {
			// showing the posts
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

// rendering edit page
router.get('/post_:id/edit', (req, res) => {
	postManager.getById(
		req.params.id,
		(post) => res.render('edit', { post }),
		() => res.sendStatus(404),
	);
});

router.post('/post_:id/edit', (req, res) => {
	// setting new parameters of the post
	let blog = {
		id: req.params.id,
		title: req.body.title,
		description: req.body.description,
		author: req.body.author,
		post: req.body.post,
	};

	// updating the selected post
	postManager.edit(req.params.id, blog, () => res.redirect('/posts'));
});

module.exports = router;
