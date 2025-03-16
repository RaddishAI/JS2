// base url: https://v2.api.noroff.dev/
// register part /auth/register

import { REGISTER_API_URL } from "../../scripts/constants";

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

        if (!response.ok) {
            if (json.errors && json.errors[0].message === "Profile already exists") {
                alert("This profile already exists. Please use a different email or username. Or if this is your profile, log in instead.");
            }else {
                alert(`Error: ${json.errors[0].message}`);
            }
            throw new Error(json.errors[0].message);
        }
    
        console.log("Registration successful", json);
        alert("🎉 Registration successful! You can now log in.");

        setTimeout(() => {
            window.location.href ="../login/login.html";
        }, 2000);

    } catch (error) {
        console.error("Error register user: ", error);
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
