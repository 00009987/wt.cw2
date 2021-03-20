const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.get('/', (req, res) => {
	let posts = [];
	fs.readFile(path.join(__dirname, '..', '/database/db.json'), (err, data) => {
		if (err) throw err;
		else posts = JSON.parse(data);

		res.render('posts', { posts });
	});
});

router.get('/post_:id', (req, res) => {
	let db = [];

	fs.readFile(
		path.join(__dirname, '..', '/database/db.json'),
		'utf-8',
		(err, data) => {
			if (err) throw err;
			else db = JSON.parse(data);

			let post = db.filter((post) => post.id === req.params.id)[0];

			res.render('post', { post });
		},
	);
});

router.get('/post_:id/delete', (req, res) => {
	let db = [];

	fs.readFile(
		path.join(__dirname, '..', '/database/db.json'),
		'utf-8',
		(err, data) => {
			if (err) throw err;
			else db = JSON.parse(data);

			let post = db.filter((post) => post.id === req.params.id)[0];
			let postIndex = db.indexOf(post);
			db.splice(postIndex, 1);

			fs.writeFile(
				path.join(__dirname, '..', '/database/db.json'),
				JSON.stringify(db),
				(err) => {
					if (err) throw err;
				},
			);
		},
	);

	res.redirect('/posts');
});

module.exports = router;
