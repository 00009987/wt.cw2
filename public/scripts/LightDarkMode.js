// Selectors
const modeChanger = document.querySelector('.mode-changer');
const body = document.body;

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
	// setting theme when webpage loads
	let themes = checkStorage();
	if (themes) {
		body.classList.add(themes[0]);
	}
});

modeChanger.addEventListener('click', () => {
	// adding the dark mode class to the body
	body.classList.toggle('dark-mode');

	// saving change to the local storage
	let themes = checkStorage();
	if (themes.length === 0) {
		themes.push('dark-mode');
	} else {
		themes.length = 0;
	}
	localStorage.setItem('themes', JSON.stringify(themes));
});

// Functions
function checkStorage() {
	// check if the mode is already changed
	let themes;
	if (localStorage.getItem('themes') === null) {
		themes = [];
	} else {
		themes = JSON.parse(localStorage.getItem('themes'));
	}
	return themes;
}
