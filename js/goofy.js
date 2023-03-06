
const loginButton = document.querySelector('.login-btn');
const login = document.querySelector('.login');

loginButton.addEventListener('click', function() {
  login.classList.toggle('close');
});