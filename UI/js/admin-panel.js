const allRequestsUrl = 'https://emeka-m-tracker.herokuapp.com/api/v1/requests/';

const token = localStorage.getItem('authToken');

const options = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Authorization: token,
  },
};


const processModal = (result) => {
  const processDiv = document.getElementById('message-modal');
  processDiv.innerHTML = `
      <div class="modal-div">
        <div> <i class="fa fa-check-circle"></i> </div>
        <p id="messageId">${result.message}</p>
        <button id="close">close</button>
      </div>
  `;
  processDiv.style.display = 'block';

  window.addEventListener('click', (event) => {
    if (event.target === processDiv) {
      processDiv.style.display = 'none';
    }
  });


  const closeBtn = document.getElementById('close');
  closeBtn.addEventListener('click', () => {
    processDiv.style.display = 'none';
  });
};

const clearTable = () => {
  const tableBody = document.getElementById('table-body')
    tableBody.innerHTML = '';
}
const clearDetailsModal = () => {
  document.getElementById('details-modal').innerHTML = '';
  document.getElementById('details-modal').style.display = 'none';
}

/**
 * @description fetch method to consume API used to get users' request details for logged in admin.
 *
 * @param {string} requestsUrl - API endpoint
 * @param {Object} options - Mthod and headers
 *
 * @returns {object} response JSON Object
 */
const modalDiv = document.getElementById('details-modal');
const requestDetailsModal = (data, message) => {
  const card = document.createElement('div');
  card.className = 'details-card';

  const header = document.createElement('div');
  header.className = 'details-title';
  header.innerHTML = `<h3>${message}</h3>`;

  const wrapper = document.createElement('div');
  wrapper.className = 'wrapper';

  const column1 = document.createElement('div');
  column1.className = 'column';

  const column2 = document.createElement('div');
  column2.className = 'column';

  const imgDiv = document.createElement('div');
  imgDiv.innerHTML = `<img src="${data.imageurl}" />`;

  column1.appendChild(imgDiv);

  const btnDiv = document.createElement('div');
  btnDiv.className = 'btn-div';

  const approveBtn = document.createElement('button');
  approveBtn.className = 'btn btn-details';
  approveBtn.innerHTML = '<i class="fa fa-thumbs-up"></i> Approve';

  const disapproveBtn = document.createElement('button');
  disapproveBtn.className = 'btn btn-delete';
  disapproveBtn.innerHTML = '<i class="fa fa-thumbs-down"></i> Disapprove';

  const resolveBtn = document.createElement('button');
  resolveBtn.className = 'btn resolve-btn';
  resolveBtn.innerHTML = '<i class="fa fa-check"></i> Check as resolved';
  column2.innerHTML = `
              <p class="para"> <label>Request ID</label> : <span>${data.requestid}</span></p>
              <p class="para"> <label>User ID</label> : <span>${data.userid}</span></p>
              <p class="para"> <label>Product</label> : <span>${data.product}</span></p>
              <p class="para"> <label>Request Date</label> : <span>${data.requestdate}</span></p>
              <p class="para"> <label>Request type</label> : <span>${data.requesttype}</span></p>
              <p class="para"> <label>Isssue</label>: <br>
              <span> ${data.issue}</span></p>
              <p class="para"> <label>Request status</label> : <span>${data.requeststatus}</span></p>
              <p class="para"> <label>Approved At</label> : <span>${data.approvedat}</span></p>
              <p class="para"> <label>Disapproved At</label> : <span>${data.disapprovedat}</span></p>
              <p class="para"> <label>Resolved At</label> : <span>${data.resolvedat}</span></p>
  `;

  btnDiv.appendChild(approveBtn);
  btnDiv.appendChild(disapproveBtn);
  btnDiv.appendChild(resolveBtn);
  column2.appendChild(btnDiv);
  card.appendChild(header);
  card.appendChild(wrapper);
  wrapper.appendChild(column1);
  wrapper.appendChild(column2);
  modalDiv.appendChild(card);

  if (data.requeststatus === 'pending') {
    resolveBtn.style.display = 'none';
  }
  if (data.requeststatus === 'approved') {
    approveBtn.style.display = 'none';
    disapproveBtn.style.display = 'none';
  }
  if (data.requeststatus === 'disapproved' || data.requeststatus === 'resolved') {
    approveBtn.style.display = 'none';
    disapproveBtn.style.display = 'none';
    resolveBtn.style.display = 'none';
  }
  modalDiv.style.display = 'block';

  window.addEventListener('click', (event) => {
    if (event.target === modalDiv) {
      modalDiv.style.display = 'none';
      modalDiv.innerHTML = '';
    }
  });

  /**
   * @description fetch method to consume API used to approve users' pending requests for logged in admin.
   *
   * @param {string} 'allRequestsUrl + data.requestid + /approve' - API endpoint
   * @param {Object} editOptions - Method and headers
   *
   * @returns {object} response JSON Object
   */
  approveBtn.addEventListener('click', () => {
    const editOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };

    fetch(`${allRequestsUrl}${data.requestid}/approve`, editOptions)
      .then(response => response.json())
      .then((approveResult) => {
        if (approveResult.success === false) {
          alert(approveResult.message);
        } else {
          clearDetailsModal();
          processModal(approveResult);
          clearTable();
          fetchAllRequests();
        }
      });
  });
};

/**
   * @description fetch method to consume API used to get all users' requests for logged in admin.
   *
   * @param {string} requestsUrl - API endpoint
   * @param {Object} options - Mthod and headers
   *
   * @returns {object} response JSON Object
   */
const fetchAllRequests = () => {
  fetch(allRequestsUrl, options)
    .then(response => response.json())
    .then((json) => {
      const { message, data } = json;

      const requestMessage = document.getElementById('status-message');
      requestMessage.innerHTML = message;

      const table = document.getElementById('users-requests');
      for (let index = 0; index < data.length; index += 1) {
        const row = table.insertRow(index + 1);

        const detailsBtn = document.createElement('button');
        detailsBtn.className = 'btn btn-details';
        detailsBtn.innerHTML = '<i class="fa fa-arrow-circle-o-right"></i> Details';

        const cell1 = row.insertCell(0);
        cell1.setAttribute('data-label', 'Request ID');
        const cell2 = row.insertCell(1);
        cell2.setAttribute('data-label', 'User ID');
        const cell3 = row.insertCell(2);
        cell3.setAttribute('data-label', 'Product');
        const cell4 = row.insertCell(3);
        cell4.setAttribute('data-label', 'Request Type');
        const cell5 = row.insertCell(4);
        cell5.setAttribute('data-label', 'Status');
        const cell6 = row.insertCell(5);
        cell6.setAttribute('data-label', 'Details');

        cell1.innerHTML = data[index].requestid;
        cell2.innerHTML = data[index].userid;
        cell3.innerHTML = data[index].product;
        cell4.innerHTML = data[index].requesttype;
        cell5.innerHTML = data[index].requeststatus;
        cell6.appendChild(detailsBtn);

        detailsBtn.addEventListener('click', () => {
          fetch(allRequestsUrl + data[index].requestid, options)
            .then(response => response.json())
            .then((myData) => {
              requestDetailsModal(myData.data[0], myData.message);
            });
        });
      }
    });
};
fetchAllRequests();
