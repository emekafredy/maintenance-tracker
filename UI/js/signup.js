const signupUrl = 'http://localhost:4500/api/v1/auth/signup';

const dangerDiv = document.getElementById('danger-alert');
const dangerTimeout = () => {
  setTimeout(() => {
    dangerDiv.style.display = 'none';
  }, 3000);
};

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

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const checkInput = (data) => {
    if (!signupBody.firstName) {
      const firstnameSpan = document.createElement('p');
      firstnameSpan.innerHTML = `${data.errors.firstName}`;
      dangerDiv.appendChild(firstnameSpan);
      dangerDiv.style.display = 'block';
    }
    if (!signupBody.lastName) {
      const lastnameSpan = document.createElement('p');
      lastnameSpan.innerHTML = `${data.errors.lastName}`;
      dangerDiv.appendChild(lastnameSpan);
      dangerDiv.style.display = 'block';
    }
    if (!signupBody.email) {
      const emailSpan = document.createElement('p');
      emailSpan.innerHTML = `${data.errors.email}`;
      dangerDiv.appendChild(emailSpan);
      dangerDiv.style.display = 'block';
    }
    if (signupBody.email && !validateEmail(signupBody.email)) {
      const invalidEmailSpan = document.createElement('p');
      invalidEmailSpan.innerHTML = `${data.errors.email}`;
      dangerDiv.appendChild(invalidEmailSpan);
      dangerDiv.style.display = 'block';
    }
    if (!signupBody.password) {
      const passwordSpan = document.createElement('p');
      passwordSpan.innerHTML = `${data.errors.password}`;
      dangerDiv.appendChild(passwordSpan);
      dangerDiv.style.display = 'block';
    }
    if (signupBody.password && signupBody.password.length < 6) {
      const passwordSpan = document.createElement('p');
      passwordSpan.innerHTML = `${data.errors.password}`;
      dangerDiv.appendChild(passwordSpan);
      dangerDiv.style.display = 'block';
    }
    if (signupBody.password && signupBody.password.length > 15) {
      const passwordSpan = document.createElement('p');
      passwordSpan.innerHTML = `${data.errors.password}`;
      dangerDiv.appendChild(passwordSpan);
      dangerDiv.style.display = 'block';
    }
    if (signupBody.firstName &&
        signupBody.lastName &&
        signupBody.email &&
        signupBody.password &&
        signupBody.password.length >= 6 &&
        signupBody.password.length <= 15 &&
        validateEmail(signupBody.email) && data.success === false) {
      const emailPara = document.createElement('p');
      emailPara.innerHTML = `${data.message}`;
      dangerDiv.appendChild(emailPara);
      dangerDiv.style.display = 'block';
    }
  };

  fetch(signupUrl, options)
    .then(response => response.json())
    .then((data) => {
      console.log(data);
      if (data.success === false) {
        dangerDiv.innerHTML = '';
        checkInput(data);
        dangerTimeout();
      } else {
        localStorage.setItem('authToken', `Bearer ${data.token}`);
        window.location.href = 'http://localhost:4500/user-requests.html';
      }
    });
};

registerBtn.addEventListener('click', registerUser);
