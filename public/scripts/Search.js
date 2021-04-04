// Selectors and Variables
const searchBtn = document.querySelector('.search-btn');
const searchTitle = document.querySelector('#title');
const postsMainContainer = document.querySelector('.posts-main');
const pathname = window.location.origin;
const apiLink = `${pathname}/api/v1/posts`;

// Event Listeners
searchBtn.addEventListener('click', () => {
	fetchApi(apiLink);
});

// Functions
async function fetchApi(url) {
	// fetching the data from db
	const dataFetch = await fetch(url);
	let posts = await dataFetch.json();
	// sending posts to filter
	findPosts(posts);
}

function findPosts(posts) {
	// filtering posts according to what user typed
	let searchTerm = searchTitle.value;
	let filteredPosts = posts.filter((post) =>
		post.title.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	// clearing out the input field
	// and deleting all the visible posts
	clear();

	// according to number of found posts, generate elements or show error msg
	if (filteredPosts.length === 0) {
		generateMessage();
	} else if (filteredPosts.length === 1) {
		let post = filteredPosts[0];
		generatePosts(post);
	} else {
		filteredPosts.forEach((post) => {
			generatePosts(post);
		});
	}
}

function generateMessage() {
	// creating the error message element
	const msg = document.createElement('p');
	msg.classList.add('errMsg');
	msg.innerHTML = `
    The term you entered didn't match with any posts. 
    <br/> Please try another one.
    `;
	postsMainContainer.appendChild(msg);
}

function generatePosts(post) {
	// creating the parent post container
	const postContainer = document.createElement('div');
	postContainer.classList.add('post-container');

	// creating the details of the post
	postContainer.innerHTML = `
        <h3>${post.title}</h3>
        <p class="author">by ${post.author}</p>
        <p class="date"> ${post.date}</p>
        <p class="desc"> ${post.description}</p>
        <a href='/posts/post_${post.id}'> Go to post </a>
        `;

	postsMainContainer.appendChild(postContainer);
}

function clear() {
	postsMainContainer.innerHTML = '';
	searchTitle.value = '';
}
