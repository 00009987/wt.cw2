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
			if (err) console.log(err);
			else db = JSON.parse(data);

			let post = db.filter((post) => post.id === req.params.id)[0];

			res.render('post', { post });
		},
	);
});

module.exports = router;
