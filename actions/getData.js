const fs = require('fs');
const path = require('path');

function getData() {
	let db = [];

	fs.readFile(path.join(__dirname, '..', '/database/db.json'), (err, data) => {
		if (err) console.log(err);

		db = JSON.parse(data);
	});

	return db;
}

module.exports = getData();
