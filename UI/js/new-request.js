const postRequestUrl = '/api/v1/users/requests';
const userUrl = '/api/v1/user';

const successDiv = document.getElementById('success-alert');
const dangerDiv = document.getElementById('danger-alert');

const dangerTimeout = () => {
  setTimeout(() => {
    dangerDiv.style.display = 'none';
  }, 3000);
};
const successTimeout = () => {
  setTimeout(() => {
    successDiv.style.display = 'none';
  }, 3000);
};

const token = localStorage.getItem('authToken');


const getOptions = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Authorization: token,
  },
};

fetch(userUrl, getOptions)
  .then(response => response.json())
  .then((user) => {
    const userLink = document.getElementById('user-id');
    userLink.innerHTML = ` <span class="role" ><i class="fa fa-user-circle-o"></i> ${user.data[0].firstname}</span>`;
    userLink.addEventListener('click', () => {
      if (user.data[0].isadmin) {
        window.location.href = 'admin-profile.html';
      }
      window.location.href = 'user-profile.html';
    });
  });

const product = document.getElementById('product');
const requestType = document.getElementById('request-type');
const issueDescription = document.getElementById('issue-description');
const productImage = document.getElementById('product-image');

const submitRequest = document.getElementById('submitRequest');

const cloudName = 'mtracker_products';
const uploadImage = () => {
  const imgsurl = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
  const xhr = new window.XMLHttpRequest();
  xhr.open('POST', imgsurl, true);
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
};


const createRequest = () => {
  const requestBody = {
    product: product.value,
    requestType: requestType.value,
    issue: issueDescription.value,
    imageUrl: productImage.value,
  };

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(requestBody),
  };

  const checkInput = (data) => {
    if (data.success === false) {
      dangerDiv.innerHTML = `${data.errors.Issue}`;
      dangerDiv.style.display = 'block';
    }
  };
  uploadImage();

  fetch(postRequestUrl, options)
    .then(response => response.json())
    .then((data) => {
      if (data.success === false) {
        dangerDiv.innerHTML = `${data.message}`;
        dangerDiv.style.display = 'block';
        dangerTimeout();
        checkInput(data);
        dangerTimeout();
      } else {
        document.getElementById('issue-description').value = '';
        successDiv.innerHTML = `${data.message}`;
        successDiv.style.display = 'block';
        successTimeout();
        window.location.href = 'user-requests.html';
      }
    });
};

submitRequest.addEventListener('click', createRequest);
