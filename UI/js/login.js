const loginUrl = 'https://emeka-m-tracker.herokuapp.com/api/v1/auth/login';

const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

const loginBtn = document.getElementById('loginUser');

const loginUser = () => {
  const loginBody = {
    email: emailInput.value,
    password: passwordInput.value,
  };

  const options = {
    method: 'POST',
    body: JSON.stringify(loginBody),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const checkInput = (data) => {
    const emailAlert = document.getElementById('email-alert');
    const passwordAlert = document.getElementById('password-alert');

    if (!loginBody.email) {
      emailAlert.style.display = 'block';
      emailAlert.innerHTML = data.errors.email;
    }
    if (!loginBody.password) {
      passwordAlert.style.display = 'block';
      passwordAlert.innerHTML = data.errors.password;
    }
  };

  fetch(loginUrl, options)
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

loginBtn.addEventListener('click', loginUser);
