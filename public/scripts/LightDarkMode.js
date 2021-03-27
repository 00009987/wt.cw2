const modeChanger = document.querySelector('.mode-changer');
const body = document.body;

document.addEventListener('DOMContentLoaded', () => {
	let theme = checkStorage();
	if (theme) {
		body.classList.add(theme);
	}
});

modeChanger.addEventListener('click', () => {
	body.classList.toggle('dark-mode');
	localStorage.setItem('themes', JSON.stringify(['dark-mode']));
});

function checkStorage() {
	// check if the mode is already changed
	let theme;
	if (localStorage.getItem('themes') === null) {
		theme = '';
	} else {
		theme = JSON.parse(localStorage.getItem('themes'));
	}
	return theme[0];
}
