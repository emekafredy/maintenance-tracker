const allRequestsUrl = 'http://localhost:4500/api/v1/requests/';
const userUrl = 'http://localhost:4500/api/v1/user';

const dangerDiv = document.getElementById('danger-alert');
const successDiv = document.getElementById('success-alert');
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
    const userLink = document.getElementById('user-id');
    userLink.innerHTML = ` <span class="role" ><i class="fa fa-user-circle-o"></i> ${user.data[0].firstname} admin</span>`;
    userLink.addEventListener('click', () => {
      window.location.href = 'admin-profile.html';
    });
  });


const processMessage = (result) => {
  successDiv.innerHTML = `${result.message}`;
  successDiv.style.display = 'block';
  successTimeout();
};
const errorMessage = (result) => {
  dangerDiv.innerHTML = `${result.message}`;
  dangerDiv.style.display = 'block';
  dangerTimeout();
};

const clearTable = () => {
  const tableBody = document.getElementById('table-body');
  tableBody.innerHTML = '';
};
const clearDetailsModal = () => {
  document.getElementById('details-modal').innerHTML = '';
  document.getElementById('details-modal').style.display = 'none';
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
      const { data } = json;

      const table = document.getElementById('users-requests');
      for (let index = 0; index < data.length; index += 1) {
        const row = table.insertRow(index + 1);

        const detailsBtn = document.createElement('button');
        detailsBtn.className = 'btn btn-details';
        detailsBtn.innerHTML = '<i class="fa fa-arrow-circle-o-right"></i> Details';

        const cell1 = row.insertCell(0);
        cell1.setAttribute('data-label', 'User ID');
        const cell2 = row.insertCell(1);
        cell2.setAttribute('data-label', 'Name');
        const cell3 = row.insertCell(2);
        cell3.setAttribute('data-label', 'Product');
        const cell4 = row.insertCell(3);
        cell4.setAttribute('data-label', 'Request Type');
        const cell5 = row.insertCell(4);
        cell5.setAttribute('data-label', 'Status');
        const cell6 = row.insertCell(5);
        cell6.setAttribute('data-label', 'Details');

        cell1.innerHTML = data[index].userid;
        cell2.innerHTML = `${data[index].firstname} ${data[index].lastname}`;
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
              <p class="para"> <label>Name</label> : <span>${data.firstname} ${data.lastname}</span></p>
              <p class="para"> <label>Email</label> : <span>${data.email}</span></p>
              <p class="para"> <label>Product</label> : <span>${data.product}</span></p>
              <p class="para"> <label>Request Date</label> : <span>${data.requestdate}</span></p>
              <p class="para"> <label>Request type</label> : <span>${data.requesttype}</span></p>
              <p class="para"> <label>Isssue</label>: <br>
              <span> ${data.issue}</span></p>
              <p class="para"> <label>Request status</label> : <span>${data.requeststatus}</span></p>
              <p class="para" id="approved-para"> <label>Approved At</label> : <span>${data.approvedat}</span></p>
              <p class="para" id="disapproved-para"> <label>Disapproved At</label> : <span>${data.disapprovedat}</span></p>
              <p class="para" id="resolved-para"> <label>Resolved At</label> : <span>${data.resolvedat}</span></p>
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

  displayProcessDate(data);

  modalDiv.style.display = 'block';

  window.addEventListener('click', (event) => {
    if (event.target === modalDiv) {
      modalDiv.style.display = 'none';
      modalDiv.innerHTML = '';
    }
  });

  /**
   * @description fetch method to consume API used to approve users'
   * pending requests for logged in admin.
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
          errorMessage(approveResult);
        } else {
          clearDetailsModal();
          processMessage(approveResult);
          clearTable();
          window.location.href = 'admin-panel.html';
        }
      });
  });

  /**
   * @description fetch method to consume API used to disapprove users'
   * pending requests for logged in admin.
   *
   * @param {string} 'allRequestsUrl + data.requestid + /disapprove' - API endpoint
   * @param {Object} editOptions - Method and headers
   *
   * @returns {object} response JSON Object
   */
  disapproveBtn.addEventListener('click', () => {
    const editOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };

    fetch(`${allRequestsUrl}${data.requestid}/disapprove`, editOptions)
      .then(response => response.json())
      .then((disapproveResult) => {
        if (disapproveResult.success === false) {
          errorMessage(disapproveResult);
        } else {
          clearDetailsModal();
          processMessage(disapproveResult);
          clearTable();
          window.location.href = 'admin-panel.html';
        }
      });
  });

  /**
   * @description fetch method to consume API used to resolve users'
   * approved requests for logged in admin.
   *
   * @param {string} 'allRequestsUrl + data.requestid + /resolve' - API endpoint
   * @param {Object} editOptions - Method and headers
   *
   * @returns {object} response JSON Object
   */
  resolveBtn.addEventListener('click', () => {
    const editOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };

    fetch(`${allRequestsUrl}${data.requestid}/resolve`, editOptions)
      .then(response => response.json())
      .then((resolveResult) => {
        if (resolveResult.success === false) {
          errorMessage(resolveResult);
        } else {
          clearDetailsModal();
          processMessage(resolveResult);
          clearTable();
          window.location.href = 'admin-panel.html';
        }
      });
  });
};

