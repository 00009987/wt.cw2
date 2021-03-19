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

module.exports = router;
