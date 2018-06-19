const requestsUrl = '/api/v1/users/requests/';
const userUrl = '/api/v1/user';
let detailsData = {};

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
    if (user.data[0].isadmin === false) {
      const userLink = document.getElementById('user-id');
      userLink.innerHTML = ` <span class="role" ><i class="fa fa-user-circle-o"></i> ${user.data[0].firstname}</span>`;
      userLink.addEventListener('click', () => {
        window.location.href = 'user-profile.html';
      });
    } else {
      window.location.href = 'admin-panel.html';
    }
  });

const displayProcessDate = (data) => {
  const approvedPara = document.getElementById('approved-para');
  const disapprovedPara = document.getElementById('disapproved-para');
  const resolvedPara = document.getElementById('resolved-para');
  if (data.requeststatus === 'approved') {
    approvedPara.style.display = 'block';
  }
  if (data.requeststatus === 'disapproved') {
    disapprovedPara.style.display = 'block';
  }
  if (data.requeststatus === 'resolved') {
    approvedPara.style.display = 'block';
    resolvedPara.style.display = 'block';
  }
};

/**
 * @description modal function to display user's request details by ID
 *
 * @param {string} requestsUrl - API endpoint
 * @param {Object} options - Method and headers
 *
 * @returns {object} response JSON Object
 */
const modalDiv = document.getElementById('details-modal');
const requestDetailsModal = (data, message) => {
  detailsData = data;

  const card = document.createElement('div');
  card.className = 'details-card';

  const header = document.createElement('div');
  header.className = 'details-title';
  header.innerHTML = `<h1>${message}</h1>`;

  const wrapper = document.createElement('div');
  wrapper.className = 'wrapper';

  const column1 = document.createElement('div');
  column1.className = 'column';

  const column2 = document.createElement('div');
  column2.className = 'column';

  const imgDiv = document.createElement('div');
  imgDiv.innerHTML = `<img src="${data.imageurl}" />`;

  column1.appendChild(imgDiv);

  column2.innerHTML = `
              <p class="para"> <label>Request ID</label> : <span>${data.requestid}</span></p>
              <p class="para"> <label>Product</label> : <span>${data.product}</span></p>
              <p class="para"> <label>Request Date</label> : <span>${data.requestdate}</span></p>
              <p class="para"> <label>Request type</label> : <span>${data.requesttype}</span></p>
              <p class="para"> <label>Isssue</label>: <br>
              <span> ${data.issue}</span></p>
              <p class="para"> <label>Request status</label> : <span>${data.requeststatus}</span></p>
              <p class="para" id="approved-para"> <label>Approved Date</label> : <span>${data.approvedat}</span></p>
              <p class="para" id="disapproved-para"> <label>Disapproved Date</label> : <span>${data.disapprovedat}</span></p>
              <p class="para" id="resolved-para"> <label>Resolved Date</label> : <span>${data.resolvedat}</span></p>
              <div class="btn-div" style="float:right;">
                <button class="btn btn-details" id="edit-btn" onclick="updateModal();">
                  <i class="fa fa-pencil-square-o"></i> Edit Request
                </button>
                <button class="btn" id="btn-close">
                  <i class="fa fa-close"></i> Close
                </button>
              </div>
  `;

  card.appendChild(header);
  card.appendChild(wrapper);
  wrapper.appendChild(column1);
  wrapper.appendChild(column2);
  modalDiv.appendChild(card);

  const editBtn = document.getElementById('edit-btn');
  if (data.requeststatus === 'pending') {
    editBtn.style.display = 'block';
  }
  displayProcessDate(data);

  modalDiv.style.display = 'block';

  window.addEventListener('click', (event) => {
    if (event.target === modalDiv) {
      modalDiv.style.display = 'none';
      modalDiv.innerHTML = '';
    }
  });

  const closeBtn = document.getElementById('btn-close');
  closeBtn.addEventListener('click', () => {
    modalDiv.style.display = 'none';
    modalDiv.innerHTML = '';
  });
};


/**
   * @description fetch method to consume API used to get logged in user's requests.
   *
   * @param {string} requestsUrl - API endpoint
   * @param {Object} options - Mthod and headers
   *
   * @returns {object} response JSON Object
   */
const allRequests = () => {
  fetch(requestsUrl, options)
    .then(response => response.json())
    .then((json) => {
      const { message, data } = json;

      const requestMessage = document.getElementById('status-message');
      requestMessage.innerHTML = message;

      const approveBtn = document.createElement('button');
      approveBtn.className = 'btn btn-details';
      approveBtn.innerHTML = '<i class="fa fa-thumbs-up"></i> Approve';

      const table = document.getElementById('requests-table');
      for (let index = 0; index < data.length; index += 1) {
        const row = table.insertRow(index + 1);

        const detailsBtn = document.createElement('button');
        detailsBtn.className = 'btn btn-details';
        detailsBtn.innerHTML = '<i class="fa fa-arrow-circle-o-right"></i> Details';

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn btn-delete';
        deleteBtn.innerHTML = '<i class="fa fa-trash"></i> Delete';

        const cell1 = row.insertCell(0);
        cell1.setAttribute('data-label', 'Product');
        const cell2 = row.insertCell(1);
        cell2.setAttribute('data-label', 'Request Type');
        const cell3 = row.insertCell(2);
        cell3.setAttribute('data-label', 'Status');
        const cell4 = row.insertCell(3);
        cell4.setAttribute('data-label', 'Details');
        const cell5 = row.insertCell(4);
        cell5.setAttribute('data-label', 'Cancel');

        cell1.innerHTML = data[index].product;
        cell2.innerHTML = data[index].requesttype;
        cell3.innerHTML = data[index].requeststatus;
        cell4.appendChild(detailsBtn);
        cell5.appendChild(deleteBtn);

        /**
         * @description fetch method to consume API used to get logged in user's request details.
         *
         * @param {string} requestsUrl - API endpoint
         * @param {Object} options - Mthod and headers
         *
         * @returns {object} response JSON Object
         */
        detailsBtn.addEventListener('click', () => {
          fetch(requestsUrl + data[index].requestid, options)
            .then(response => response.json())
            .then((jsondata) => {
              requestDetailsModal(jsondata.data[0], jsondata.message);
            });
        });

        /**
         * @description fetch method to consume API used to delete logged in user's pending request.
         *
         * @param {string} requestsUrl - API endpoint
         * @param {Object} options - Mthod and headers
         *
         * @returns {object} response JSON Object
         */
        const deleteModal = document.getElementById('delete-modal');
        deleteBtn.addEventListener('click', () => {
          deleteModal.style.display = 'block';

          const deleteRequestBtn = document.getElementById('delete-request');
          const cancelDeleteBtn = document.getElementById('close-modal');

          cancelDeleteBtn.addEventListener('click', () => {
            deleteModal.style.display = 'none';
          });

          deleteRequestBtn.addEventListener('click', () => {
            const deleteOptions = {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
                Authorization: token,
              },
            };
            fetch(requestsUrl + data[index].requestid, deleteOptions)
              .then(response => response.json())
              .then((deleteStatus) => {
                if (deleteStatus.success === false) {
                  deleteModal.style.display = 'none';
                  dangerDiv.innerHTML = `${deleteStatus.message}`;
                  dangerDiv.style.display = 'block';
                  dangerTimeout();
                } else {
                  deleteModal.style.display = 'none';
                  successDiv.innerHTML = `${deleteStatus.message}`;
                  successDiv.style.display = 'block';
                  successTimeout();
                  document.getElementById('table-body').innerHTML = '';
                  window.location.href = 'user-requests.html';
                }
              });
          });
        });
      }
    });
};
allRequests();


/**
   * @description modal function to update request by ID
   *
   * @param {string} requestsUrl - API endpoint
   * @param {Object} options - Mthod and headers
   *
   * @returns {object} response JSON Object
   */
const updateModal = () => {
  const updateModalDiv = document.getElementById('update-modal');

  const updateDiv = document.createElement('div');
  const titleDiv = document.createElement('div');
  const productDiv = document.createElement('div');
  const typeDiv = document.createElement('div');
  const issueDiv = document.createElement('div');
  const imgDiv = document.createElement('div');
  const submitDiv = document.createElement('div');
  const submitUpdateBtn = document.createElement('button');

  updateDiv.className = 'edit-card';

  titleDiv.textContent = 'Update Request';
  titleDiv.className = 'title';

  const form = document.createElement('form');

  productDiv.className = 'form';

  typeDiv.className = 'form';

  issueDiv.className = 'form';

  imgDiv.className = 'form';

  submitDiv.className = 'centre-div';

  submitUpdateBtn.textContent = 'Update';
  submitUpdateBtn.className = 'btn-back';

  productDiv.innerHTML = `
              <label>Product</label>
              <select id="product">
                <option ${detailsData.product === 'charger' ? 'selected' : ''} value="charger">charger</option>
                <option ${detailsData.product === 'headphone' ? 'selected' : ''} value="headphone">headphone</option>
                <option ${detailsData.product === 'laptop' ? 'selected' : ''} value="laptop">laptop</option>
                <option ${detailsData.product === 'monitor' ? 'selected' : ''} value="monitor">monitor</option>
                <option ${detailsData.product === 'chair' ? 'selected' : ''} value="chair">chair</option>
                <option ${detailsData.product === 'desk' ? 'selected' : ''} value="desk">desk</option>
              </select>
  `;

  typeDiv.innerHTML = `
              <label>Request Type</label>
              <select id="request-type">
                <option ${detailsData.requesttype === 'maintenance' ? 'selected' : ''} value="maintenance">maintenance</option>
                <option ${detailsData.requesttype === 'repair' ? 'selected' : ''} value="repair">repair</option>
                <option ${detailsData.requesttype === 'replace' ? 'selected' : ''} value="replace">replace</option>
              </select>
  `;

  issueDiv.innerHTML = `
              <label for="type">Issue</label>
              <textarea name="issue" id="issue-description" required>${detailsData.issue}</textarea>
  `;

  imgDiv.innerHTML = `
              <label for="image">Upload product image</label>
              <input type="file" name="pic" accept="image/*" id="product-image">
  `;

  form.appendChild(productDiv);
  form.appendChild(typeDiv);
  form.appendChild(issueDiv);
  form.appendChild(imgDiv);
  submitDiv.appendChild(submitUpdateBtn);
  updateDiv.appendChild(titleDiv);
  updateDiv.appendChild(form);
  updateDiv.appendChild(submitDiv);
  updateModalDiv.appendChild(updateDiv);

  updateModalDiv.style.display = 'block';

  window.addEventListener('click', (event) => {
    if (event.target === updateModalDiv) {
      updateModalDiv.style.display = 'none';
      updateModalDiv.innerHTML = '';
    }
  });

  /**
   * @description fetch method to consume API used to edit logged in user's request.
   *
   * @param {string} requestsUrl - API endpoint
   * @param {Object} options - Mthod and headers
   *
   * @returns {object} response JSON Object
   */
  const product = document.getElementById('product');
  const requestType = document.getElementById('request-type');
  const issueDescription = document.getElementById('issue-description');
  const productImage = document.getElementById('product-image');

  const clearModal = () => {
    updateModalDiv.style.display = 'none';
    updateModalDiv.innerHTML = '';
    modalDiv.style.display = 'none';
    modalDiv.innerHTML = '';
  };

  submitUpdateBtn.addEventListener('click', () => {
    const requestBody = {
      product: product.value,
      requestType: requestType.value,
      issue: issueDescription.value,
      imageUrl: productImage.value,
    };

    const editOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify(requestBody),
    };

    fetch(requestsUrl + detailsData.requestid, editOptions)
      .then(response => response.json())
      .then((data) => {
        if (data.success === false) {
          clearModal();
          dangerDiv.innerHTML = `${data.message}`;
          dangerDiv.style.display = 'block';
          dangerTimeout();
        } else {
          clearModal();
          successDiv.innerHTML = `${data.message}`;
          successDiv.style.display = 'block';
          successTimeout();
          window.location.href = 'user-requests.html';
        }
      });
  });
};

