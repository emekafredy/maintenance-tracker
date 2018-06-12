const postRequestUrl = 'https://emeka-m-tracker.herokuapp.com/api/v1/users/requests';

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

const product = document.getElementById('product');
const requestType = document.getElementById('request-type');
const issueDescription = document.getElementById('issue-description');
const productImage = document.getElementById('product-image');

const submitRequest = document.getElementById('submitRequest');

const token = localStorage.getItem('authToken');

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
      }
    });
};

submitRequest.addEventListener('click', createRequest);
