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

  const checkInput = (data) => {
    const firstNameAlert = document.getElementById('firstname-alert');
    const lastNameAlert = document.getElementById('lastname-alert');
    const emailAlert = document.getElementById('email-alert');
    const passwordAlert = document.getElementById('password-alert');

    if (!signupBody.firstName) {
      firstNameAlert.style.display = 'block';
      firstNameAlert.innerHTML = data.errors.firstName;
    }
    if (!signupBody.lastName) {
      lastNameAlert.style.display = 'block';
      lastNameAlert.innerHTML = data.errors.lastName;
    }
    if (!signupBody.email) {
      emailAlert.style.display = 'block';
      emailAlert.innerHTML = data.errors.email;
    }
    if (!signupBody.password) {
      passwordAlert.style.display = 'block';
      passwordAlert.innerHTML = data.errors.password;
    }
  };

  fetch(signupUrl, options)
    .then(response => response.json())
    .then((data) => {
      if (data.success === false) {
        checkInput(data);
      } else {
        localStorage.setItem('authToken', `Bearer ${data.token}`);
        window.location.href = 'https://emeka-m-tracker.herokuapp.com/user-requests.html';
      }
    });
};

registerBtn.addEventListener('click', registerUser);
