const registerForm = document.getElementById('register-form');
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

function registerUser(userData) {
    console.log ('Register user', userData);
}

function main(){
    const userData = {
        username: usernameInput.value,
        email: emailInput.value,
        password: passwordInput.value,
    };
   registerUser(userData); 
}

main();