const requestsUrl = 'http://localhost:4500/api/v1/users/requests/:requestId';

const token = localStorage.getItem('authToken');

const options = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Authorization: token,
  },
};


fetch(requestsUrl, options)
  .then(response => response.json())
  .then((json) => {
    const { message, data } = json;
  });
