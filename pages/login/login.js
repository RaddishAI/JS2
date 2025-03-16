import { LOGIN_API_URL } from '../../scripts/constants.js';
import { doFetch } from '../../utils/doFetch.js';

const loginForm = document.getElementById('login-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

async function loginUser(userData) {
  try {
    const fetchOptions = {
      method: 'POST',
      body: JSON.stringify(userData),
    };
    const response = await doFetch(LOGIN_API_URL, fetchOptions);
    const accessToken = response.data.accessToken;
    const userDetails = {
      name: response.data.name,
      email: response.data.email,
    };

    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('userDetails', JSON.stringify(userDetails));

    setTimeout(function () {
      window.location.href = '/';
    }, 2000);
  } catch (error) {
    console.log(error);
  }
}

loginForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const userData = {
    email: emailInput.value,
    password: passwordInput.value,
  };
  loginUser(userData);
});
