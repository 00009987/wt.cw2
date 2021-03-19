function getDate() {
	let currentDate = new Date();

	let options = {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	};

	return currentDate.toLocaleDateString('en', options);
}

module.exports = getDate();
