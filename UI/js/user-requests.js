const requestsUrl = 'https://emeka-m-tracker.herokuapp.com/api/v1/users/requests';


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

    const requestMessage = document.getElementById('status-message');
    requestMessage.innerHTML = message;

    const table = document.getElementById('requests-table');
    for (let index = 0; index < data.length; index += 1) {
      const row = table.insertRow(index + 1);

      const cell1 = row.insertCell(0);
      const cell2 = row.insertCell(1);
      const cell3 = row.insertCell(2);
      const cell4 = row.insertCell(3);
      const cell5 = row.insertCell(4);
      const cell6 = row.insertCell(5);

      cell1.innerHTML = data[index].requestid;
      cell2.innerHTML = data[index].product;
      cell3.innerHTML = data[index].requesttype;
      cell4.innerHTML = data[index].requeststatus;
      cell5.innerHTML = `<button class="btn btn-details" onclick="checkDetails(${data[index].requestid});"> 
                          <i class="fa fa-trash"></i> Details 
                        </button>`;
      cell6.innerHTML = `<button class="btn btn-delete"> 
                          <i class="fa fa-trash"></i> Cancel 
                        </button>`;
    }
  });
