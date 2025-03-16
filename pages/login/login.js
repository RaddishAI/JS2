/* console.log("Script Loaded");
 */
import { LOGIN_API_URL } from "../../scripts/constants.js";

const loginForm = document.getElementById('login-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

async function loginUser(userData) {
    try {
        const fetchOptions = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(userData),
        };
        const response = await fetch (LOGIN_API_URL, fetchOptions)
        const json = await response.json();
        const accessToken = json.data.accessToken;
        const userDetails = {
            name: json.data.name,
            email: json.data.email,
        };

        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('userDetails', JSON.stringify(userDetails));

        setTimeout(function() {
            window.location.href = '/';
        }, 2000);
    } catch (error) {
        console.log(error);        
    }


}

loginForm.addEventListener('submit', function (event) {
    event.preventDefault();
/*     console.log ('submit'); */
    const userData = {
      email: emailInput.value,
      password: passwordInput.value,
    };
    loginUser(userData);
  });