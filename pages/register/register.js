// base url: https://v2.api.noroff.dev/
// register part /auth/register

import { REGISTER_API_URL } from "../../scripts/constants.js";
import { doFetch } from "../../utils/doFetch.js";

const registerForm = document.getElementById('register-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

async function registerUser(userData) {
    try {
      const fetchOptions = {
        method: 'POST',
        body: JSON.stringify(userData),
      };

        const { ok, data } = await doFetch(REGISTER_API_URL, fetchOptions);

        if (!ok) {
            if (data?.errors?.[0]?.message === "Profile already exists") {
                alert("This profile already exists. Please use a different email or username. Or if this is your profile, log in instead.");
            } else {
                alert(`Error: ${data?.errors?.[0]?.message || "An unknown error occurred"}`);
            }
            throw new Error(data?.errors?.[0]?.message || "Unknown error");
        }
        console.log("Registration successful", data);
        alert("Registration successful! You can now log in.");

        setTimeout(() => {
            window.location.href = "../login/login.html";
        }, 2000);

    } catch (error) {
        console.error("Error register user: ", error);
    }
  }

registerForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const userData = {
      name: nameInput.value,
      email: emailInput.value,
      password: passwordInput.value,
    };
    registerUser(userData);
  });
  