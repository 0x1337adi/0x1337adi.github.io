// Light/Dark mode toggle
const toggleBtn = document.getElementById('theme-toggle');
const body = document.body;

function setTheme(mode) {
  if (mode === 'light') {
    body.classList.remove('dark-mode');
    body.classList.add('light-mode');
    toggleBtn.textContent = 'Dark Mode';
  } else {
    body.classList.remove('light-mode');
    body.classList.add('dark-mode');
    toggleBtn.textContent = 'Light Mode';
  }
  localStorage.setItem('theme', mode);
}

// Load theme from localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  setTheme(savedTheme);
}

toggleBtn.addEventListener('click', () => {
  if (body.classList.contains('dark-mode')) {
    setTheme('light');
  } else {
    setTheme('dark');
  }
}); 