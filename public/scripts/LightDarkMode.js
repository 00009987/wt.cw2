// Selectors
const modeChanger = document.querySelector('.mode-changer');
const body = document.body;

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
	// setting theme when webpage loads
	let theme = checkStorage();
	if (theme) {
		body.classList.add(theme);
	}
});

modeChanger.addEventListener('click', () => {
	// adding the dark mode class to the body
	body.classList.toggle('dark-mode');
	// saving change to the local storage
	localStorage.setItem('themes', JSON.stringify(['dark-mode']));
});

// Functions
function checkStorage() {
	// check if the mode is already changed
	let themes;
	if (localStorage.getItem('themes') === null) {
		themes = '';
	} else {
		themes = JSON.parse(localStorage.getItem('themes'));
	}
	return themes[0];
}
