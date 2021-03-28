const fs = require('fs');
const path = require('path');

class PostManager {
	constructor() {
		this.posts = [];
		this.DbPath = path.join(__dirname, '..', '/database/db.json');

		fs.readFile(this.DbPath, (err, data) => {
			if (err) {
				console.error('could not read posts data from database/db.json file.');
			} else {
				this.posts = JSON.parse(data);
			}
		});
	}

	generateId() {
		return Math.random().toString().slice(3, 9);
	}

	getDate() {
		let currentDate = new Date();

		let options = {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
		};

		return currentDate.toLocaleDateString('en', options);
	}

	updateDb(callback) {
		fs.writeFile(this.DbPath, JSON.stringify(this.posts), callback);
	}

	create(post, callback) {
		post.id = this.generateId();
		post.date = this.getDate();
		this.posts.push(post);

		this.updateDb(callback);
	}

	getAll() {
		return this.posts;
	}

	getById(id) {
		return this.posts.filter((post) => post.id === id)[0];
	}

	edit(id, post, callback) {
		const index = this.posts.findIndex((post) => post.id === id);
		post.date = this.getDate();
		this.posts[index] = post;

		this.updateDb(callback);
	}

	delete(id, callback) {
		const index = this.posts.findIndex((post) => post.id === id);
		this.posts.splice(index, 1);
		this.updateDb(callback);
	}
}

module.exports = PostManager;
