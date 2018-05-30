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

  fetch(loginUrl, options)
    .then((response) => {
      response.json({
        loginBody,
      }).then(data => console.log(data));
    }).catch(error => console.log(error));
};

loginBtn.addEventListener('click', loginUser);
