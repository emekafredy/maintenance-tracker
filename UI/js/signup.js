const signupUrl = 'https://emeka-m-tracker.herokuapp.com/api/v1/auth/signup';

const firstNameInput = document.getElementById('firstName');
const lastNameInput = document.getElementById('lastName');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

const registerBtn = document.getElementById('register');


const registerUser = () => {
  const signupBody = {
    firstName: firstNameInput.value,
    lastName: lastNameInput.value,
    email: emailInput.value,
    password: passwordInput.value,
  };

  const options = {
    method: 'POST',
    body: JSON.stringify(signupBody),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  fetch(signupUrl, options)
    .then((response) => {
      response.json({
        signupBody,
      }).then(data => console.log(data));
    }).catch(error => console.log(error));
};

registerBtn.addEventListener('click', registerUser);
