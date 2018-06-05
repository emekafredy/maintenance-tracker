const allRequestsUrl = 'https://emeka-m-tracker.herokuapp.com/api/v1/requests';

const token = localStorage.getItem('authToken');

const options = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Authorization: token,
  },
};

/**
   * @description fetch method to consume API used to get all users' requests for logged in admin.
   *
   * @param {string} requestsUrl - API endpoint
   * @param {Object} options - Mthod and headers
   *
   * @returns {object} response JSON Object
   */
fetch(allRequestsUrl, options)
  .then(response => response.json())
  .then((json) => {
    const { message, data } = json;

    const requestMessage = document.getElementById('status-message');
    requestMessage.innerHTML = message;

    const table = document.getElementById('users-requests');
    for (let index = 0; index < data.length; index += 1) {
      const row = table.insertRow(index + 1);

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
      cell6.innerHTML = `<button class="btn btn-details" onclick="checkDetails(${data[index].requestid});"> 
                          <i class="fa fa-trash"></i> Details 
                        </button>`;
    }
  });
