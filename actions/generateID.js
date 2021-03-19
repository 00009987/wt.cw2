function generateId() {
	return Math.random().toString().slice(3, 9);
}

module.exports = generateId;
