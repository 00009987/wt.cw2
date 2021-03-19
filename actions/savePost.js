const fs = require('fs');
const path = require('path');

function savePost(post) {
	let db = [];

	fs.readFile(path.join(__dirname, '..', '/database/db.json'), (err, data) => {
		if (err) throw err;
		db = JSON.parse(data);
		db.push(post);

		fs.writeFile(
			path.join(__dirname, '..', '/database/db.json'),
			JSON.stringify(db),
			(err) => {
				if (err) throw err;
			},
		);
	});
}

module.exports = savePost;
