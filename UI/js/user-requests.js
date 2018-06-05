const requestsUrl = 'https://emeka-m-tracker.herokuapp.com/api/v1/users/requests';


const token = localStorage.getItem('authToken');

const options = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Authorization: token,
  },
};

/**
   * @description fetch method to consume API used to get logged in user's requests.
   *
   * @param {string} requestsUrl - API endpoint
   * @param {Object} options - Mthod and headers
   *
   * @returns {object} response JSON Object
   */
fetch(requestsUrl, options)
  .then(response => response.json())
  .then((json) => {
    const { message, data } = json;

    const requestMessage = document.getElementById('status-message');
    requestMessage.innerHTML = message;


    const table = document.getElementById('requests-table');
    for (let index = 0; index < data.length; index += 1) {
      const row = table.insertRow(index + 1);

      const cell1 = row.insertCell(0);
      cell1.setAttribute('data-label', 'Request ID');
      const cell2 = row.insertCell(1);
      cell2.setAttribute('data-label', 'Product');
      const cell3 = row.insertCell(2);
      cell3.setAttribute('data-label', 'Request Type');
      const cell4 = row.insertCell(3);
      cell4.setAttribute('data-label', 'Status');
      const cell5 = row.insertCell(4);
      cell5.setAttribute('data-label', 'Details');
      const cell6 = row.insertCell(5);
      cell6.setAttribute('data-label', 'Cancel');

      cell1.innerHTML = data[index].requestid;
      cell2.innerHTML = data[index].product;
      cell3.innerHTML = data[index].requesttype;
      cell4.innerHTML = data[index].requeststatus;
      cell5.innerHTML = `<button class="btn btn-details" onclick="checkDetails(${data[index].requestid});"> 
                          <i class="fa fa-arrow-circle-o-right"></i> Details 
                        </button>`;
      cell6.innerHTML = `<button class="btn btn-delete"> 
                          <i class="fa fa-trash"></i> Cancel 
                        </button>`;
    }
  });


/**
   * @description modal function to display user's request details by ID
   *
   * @param {string} requestsUrl - API endpoint
   * @param {Object} options - Mthod and headers
   *
   * @returns {object} response JSON Object
   */
const requestDetailsModal = (data, message) => {
  const modalDiv = document.getElementById('details-modal');

  const card = document.createElement('div');
  card.className = 'card';

  const header = document.createElement('div');
  header.className = 'header';
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
              <p> <label>Request ID</label> : <span>${data.requestid}</span></p>
              <p> <label>Product</label> : <span>${data.product}</span></p>
              <p> <label>Request Date</label> : <span>${data.requestdate}</span></p>
              <p> </p><label>Request type</label> : <span>${data.requesttype}</span></p>
              <p> <label>Isssue</label>: <br>
              <span> ${data.issue}</span></p>
              <p> </p><label>Request status</label> : <span>${data.requeststatus}</span></p>
              <p> </p><label>Approved Date</label> : <span>${data.approvedat}</span></p>
              <p> </p><label>Disapproved Date</label> : <span>${data.disapprovedat}</span></p>
              <p> </p><label>Resolved Date</label> : <span>${data.resolvedat}</span></p>
              <div class="btn-div">
                <button class="btn btn-details" onclick="updateModal();">
                  <i class="fa fa-pencil-square-o"></i> Edit Request
                </button>
                <button class="btn" id="btn-close">
                  <i class="fa fa-close"></i> Close
                </button>
              </div><br><br>
          `;

  card.appendChild(header);
  card.appendChild(wrapper);
  wrapper.appendChild(column1);
  wrapper.appendChild(column2);
  modalDiv.appendChild(card);

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
   * @description fetch method to consume API used to get logged in user's request details.
   *
   * @param {string} requestsUrl - API endpoint
   * @param {Object} options - Mthod and headers
   *
   * @returns {object} response JSON Object
   */
const checkDetails = (id) => {
  fetch(requestsUrl + id, options)
    .then(response => response.json())
    .then((json) => {
      const { message, data } = json;
      requestDetailsModal(data[0], message);
    });
};
