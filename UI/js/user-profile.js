const userUrl = 'https://emeka-m-tracker.herokuapp.com/api/v1/user';

const token = localStorage.getItem('authToken');
const options = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Authorization: token,
  },
};

fetch(userUrl, options)
  .then(response => response.json())
  .then((user) => {
    const namePara = document.getElementById('user-name');
    const idSpan = document.getElementById('user-id');
    const emailSpan = document.getElementById('user-email');
    const roleTitle = document.getElementById('role-title');

    namePara.innerHTML = `${user.data[0].firstname} ${user.data[0].lastname}`;
    idSpan.innerHTML = `${user.data[0].userid}`;
    emailSpan.innerHTML = `${user.data[0].email}`;

    if (user.data[0].isadmin) {
      roleTitle.innerHTML = 'ADMIN';
    } else {
      roleTitle.innerHTML = 'USER';
    }
  });
