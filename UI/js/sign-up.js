import fetch from 'node-fetch';

const signupUrl = 'https://emeka-m-tracker.herokuapp.com/api/v1/auth/signup';

const firstNameInput = document.getElementById('firstName').value;
const lastNameInput = document.getElementById('lastName').value;
const emailInput = document.getElementById('email').value;
const passwordInput = document.getElementById('password').value;


const signupBody = {
  firstName: firstNameInput,
  lastName: lastNameInput,
  email: emailInput,
  password: passwordInput,
};

const options = {
  method: 'POST',
  mode: 'cors',
  body: JSON.stringify(signupBody),
  headers: {
    'Content-Type': 'application/json',
  },
};

const registerUser = () => {
  fetch(signupUrl, options)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch((error) => {
      console.log(error);
    });
};


document.getElementById('registerUsers').addEventListener('submit', registerUser);
