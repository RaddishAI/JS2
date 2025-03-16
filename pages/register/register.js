// base url: https://v2.api.noroff.dev/
// register part /auth/register

const BASE_API_URL = 'https://v2.api.noroff.dev';

const REGISTER_API_URL = BASE_API_URL + '/auth/register';

const registerForm = document.getElementById('register-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

async function registerUser(userData) {
    console.log ('Register user', userData);

    try {
        const fetchOptions = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(userData),
        };

        const response = await fetch(REGISTER_API_URL, fetchOptions);
        const json = await response.json();
    } catch (error) {
        //
    }
}

registerForm.addEventListener('submit', function (event){
    event.preventDefault();
    const userData = {
        name: nameInput.value,
        email: emailInput.value,
        password: passwordInput.value,
    }
    registerUser(userData);
});

/* function main(){
    const userData = {
        username: usernameInput.value,
        email: emailInput.value,
        password: passwordInput.value,
    };
   registerUser(userData); 
}

main(); */
