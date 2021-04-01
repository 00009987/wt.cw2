const fs = require('fs');
const path = require('path');
const DbPath = path.join(__dirname, '..', '/database/db.json');

class PostManager {
	// function to generate unique ids
	generateId() {
		return Math.random().toString().slice(3, 9);
	}

	// function to get the current date
	getDate() {
		let currentDate = new Date();

		let options = {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
		};

		return currentDate.toLocaleDateString('en', options);
	}

	// function to add a post to db
	create(post, callback) {
		fs.readFile(DbPath, (err, data) => {
			if (err) throw err;

			let posts = JSON.parse(data); // getting data from db
			post.id = this.generateId(); // setting post's id
			post.date = this.getDate(); // setting posts's date
			posts.push(post); // adding the post

			// adding changes to the db
			fs.writeFile(DbPath, JSON.stringify(posts), (err) => {
				if (err) throw err;

				callback();
			});
		});
	}

	// function to get all the posts from db
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

	// function to get a post according to its id
	getById(id, callback, error) {
		fs.readFile(DbPath, (err, data) => {
			if (err) error();

			let posts = JSON.parse(data); // getting data from db
			let post = posts.filter((post) => post.id === id)[0]; // finding the required post
			callback(post);
		});
	}

	// function to update a post according to its id
	edit(id, post, callback) {
		fs.readFile(DbPath, (err, data) => {
			if (err) throw err;

			let posts = JSON.parse(data); // getting data from db
			let index = posts.findIndex((post) => post.id === id); // getting thex index of the required post
			post.date = this.getDate(); // setting new date to the updated post
			posts[index] = post; // changing the new post with the old one

			// saving the changes in the db
			fs.writeFile(DbPath, JSON.stringify(posts), (err) => {
				if (err) throw err;

				callback();
			});
		});
	}

	// function to delete a post according to its id
	delete(id, callback, error) {
		fs.readFile(DbPath, (err, data) => {
			if (err) {
				error();
			} else {
				let posts = JSON.parse(data); // getting data from db
				let index = posts.findIndex((post) => post.id === id); // getting thex index of the required post
				posts.splice(index, 1); // deleting the post from db array

				// saving the changes in the db
				fs.writeFile(DbPath, JSON.stringify(posts), (err) => {
					if (err) error();

					callback();
				});
			}
		});
	}
}

module.exports = PostManager;
