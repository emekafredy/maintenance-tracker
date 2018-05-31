const postRequestUrl = 'https://emeka-m-tracker.herokuapp.com/api/v1/users/requests';

const product = document.getElementById('product');
const requestType = document.getElementById('request-type');
const issueDescription = document.getElementById('issue-description');

const submitRequest = document.getElementById('submitRequest');

const token = localStorage.getItem('authToken');

const createRequestModal = () => {
  const modalDiv = document.getElementById('modal-container');
  modalDiv.innerHTML = `
      <div class="modal-div">
        <div> <i class="fa fa-check-circle"></i> </div>
        <p id="messageId">Request Successfully Created</p>
        <button id="close">close</button>
      </div>
  `;
  modalDiv.style.display = 'block';

  window.addEventListener('click', (event) => {
    if (event.target === modalDiv) {
      modalDiv.style.display = 'none';
    }
  });


  const closeBtn = document.getElementById('close');
  closeBtn.addEventListener('click', () => {
    modalDiv.style.display = 'none';
  });
};

const createRequest = () => {
  const requestBody = {
    product: product.value,
    requestType: requestType.value,
    issue: issueDescription.value,
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
    if (!requestBody.issueDescription) {
      alert(data.errors.Issue);
    }
  };

  fetch(postRequestUrl, options)
    .then(response => response.json())
    .then((data) => {
      if (data.success === false) {
        checkInput(data);
      } else {
        createRequestModal();
      }
    });
};

submitRequest.addEventListener('click', createRequest);
