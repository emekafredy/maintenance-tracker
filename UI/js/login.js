const loginUrl = 'https://emeka-m-tracker.herokuapp.com/api/v1/auth/login';

const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

const loginBtn = document.getElementById('loginUser');

const dangerDiv = document.getElementById('danger-alert');
const dangerTimeout = () => {
  setTimeout(() => {
    dangerDiv.style.display = 'none';
  }, 3000);
};

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
    if (loginBody.password && !loginBody.email) {
      dangerDiv.innerHTML = `${data.errors.email}`;
      dangerDiv.style.display = 'block';
    }
    if (loginBody.email && !loginBody.password) {
      dangerDiv.innerHTML = `${data.errors.password}`;
      dangerDiv.style.display = 'block';
    }
    if (!loginBody.email && !loginBody.password) {
      dangerDiv.innerHTML = `${data.errors.email} </br> ${data.errors.password}`;
      dangerDiv.style.display = 'block';
    }
  };

  fetch(loginUrl, options)
    .then(response => response.json())
    .then((data) => {
      if (data.success === false) {
        dangerDiv.innerHTML = `${data.message}`;
        dangerDiv.style.display = 'block';
        dangerTimeout();
        checkInput(data);
        dangerTimeout();
      }
      if (data.success === true) {
        if (data.foundmail[0].isadmin) {
          localStorage.setItem('authToken', `Bearer ${data.token}`);
          window.location.href = 'https://emeka-m-tracker.herokuapp.com/admin-panel.html';
        } else {
          localStorage.setItem('authToken', `Bearer ${data.token}`);
          window.location.href = 'https://emeka-m-tracker.herokuapp.com/user-requests.html';
        }
      }
    });
};

loginBtn.addEventListener('click', loginUser);
