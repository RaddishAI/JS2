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

        const { ok, data } = await doFetch(LOGIN_API_URL, fetchOptions);

        console.log("📜 Full API response: ", data); // Debugging log

        if (!ok) {
            alert(`Login failed: ${data.errors ? data.errors[0].message : "Unknown error"}`);
            throw new Error(data.errors ? data.errors[0].message : "Unknown error");
        }

        const accessToken = data.data.accessToken;
        const userDetails = {
            name: data.data.name,
            email: data.data.email,
        };

        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('userDetails', JSON.stringify(userDetails));

        console.log("Access Token Stored:", accessToken);

        alert("🎉 Login successful! Redirecting...");
        setTimeout(() => {
            window.location.href = "/";
        }, 2000);

    } catch (error) {
        console.error("Login error:", error);
    }
}


/* async function loginUser(userData) {
    try {
        const fetchOptions = {
            method: 'POST',
            body: JSON.stringify(userData),
        };

        const { ok, data } = await doFetch(LOGIN_API_URL, fetchOptions);

       console.log("Full API response: ", data);

        if (!ok) {
            alert(`Login failed: ${data.errors ? data.errors[0].message : "Unknown error"}`);
            throw new Error(data.errors ? data.errors[0].message : "Unknown error");
        }

        // ✅ Store the token in localStorage
        localStorage.setItem('accessToken', data.data.accessToken);
        console.log("🔑 Access Token Stored:", data.data.accessToken);

        // ✅ Redirect to homepage
        alert("🎉 Login successful! Redirecting...");
        setTimeout(() => {
            window.location.href = "/";
        }, 2000);

    } catch (error) {
        console.error("❌ Login error:", error);
    }
} */

/* async function loginUser(userData) {
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
} */

loginForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const userData = {
    email: emailInput.value,
    password: passwordInput.value,
  };
  loginUser(userData);
});
