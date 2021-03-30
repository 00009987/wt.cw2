const fs = require('fs');
const path = require('path');
const DbPath = path.join(__dirname, '..', '/database/db.json');

class PostManager {
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

	create(post, callback) {
		fs.readFile(DbPath, (err, data) => {
			if (err) throw err;

			let posts = JSON.parse(data);
			post.id = this.generateId();
			post.date = this.getDate();
			posts.push(post);

			fs.writeFile(DbPath, JSON.stringify(posts), (err) => {
				if (err) throw err;

				callback();
			});
		});
	}

	getAll(callback) {
		fs.readFile(DbPath, (err, data) => {
			if (err) {
				console.error('could not read posts data from database/db.json file.');
			} else {
				let posts = JSON.parse(data);
				callback(posts);
			}
		});
	}

	getById(id, callback, error) {
		fs.readFile(DbPath, (err, data) => {
			if (err) error();

			let posts = JSON.parse(data);
			let post = posts.filter((post) => post.id === id)[0];
			callback(post);
		});
	}

	edit(id, post, callback) {
		fs.readFile(DbPath, (err, data) => {
			if (err) throw err;

			let posts = JSON.parse(data);
			let index = posts.findIndex((post) => post.id === id);
			post.date = this.getDate();
			posts[index] = post;

			fs.writeFile(DbPath, JSON.stringify(posts), (err) => {
				if (err) throw err;

				callback();
			});
		});
	}

	delete(id, callback, error) {
		fs.readFile(DbPath, (err, data) => {
			if (err) {
				error();
			} else {
				let posts = JSON.parse(data);
				let index = posts.findIndex((post) => post.id === id);
				posts.splice(index, 1);

				fs.writeFile(DbPath, JSON.stringify(posts), (err) => {
					if (err) error();

					callback();
				});
			}
		});
	}
}

module.exports = PostManager;
