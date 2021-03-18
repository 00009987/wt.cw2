const express = require('express');
const router = express.Router();

// compose page
router.get('/', (req, res) => res.render('compose'));

router.post('/', (req, res) => {
	let db = require('../actions/getData');

	const blog = {
		title: req.body.title,
		description: req.body.description,
		author: req.body.author,
		post: req.body.post,
	};
	db.push(blog);

	const writeData = require('../actions/writeData');
	writeData(db);

	res.redirect('/compose');
});
module.exports = router;
