const fs = require('fs');
const path = require('path');

function writeData(DB) {
	let db = DB;

	fs.writeFile(
		path.join(__dirname, '..', '/database/db.json'),
		JSON.stringify(db),
		(err) => {
			if (err) console.log(err);
		},
	);
}

module.exports = writeData;
