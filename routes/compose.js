const express = require('express');
const router = express.Router();

// compose page
router.get('/', (req, res) => res.render('compose'));

router.post('/', (req, res) => {
	const blogId = require('../actions/generateID')();
	const currentDate = require('../actions/getCurrentDate');

	const blog = {
		id: blogId,
		title: req.body.title,
		description: req.body.description,
		author: req.body.author,
		post: req.body.post,
		date: currentDate,
	};

	const savePost = require('../actions/savePost');
	savePost(blog);

	res.redirect('/compose');
});
module.exports = router;
