let requestStatus = document.getElementById('request-status');
let resolveHeader = document.getElementById('resolveHeader');
let resolveDate = document.getElementById('resolveDate');

let approveBtn = document.getElementById('approveBtn');
let rejectBtn = document.getElementById('rejectBtn');
let resolveBtn = document.getElementById('resolveBtn');

const formatDate = (date) => {
  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  return day + ' ' + monthNames[monthIndex] + ' ' + year;
}


const process = {
  approveRequest: () => {
    if (requestStatus.textContent == 'Pending') {
      requestStatus.textContent = 'Approved';
      approveBtn.style.display = 'none';
      rejectBtn.style.display = 'none';
      resolveBtn.style.display = 'block';
    }
  },
  rejectRequest: () => {
    if (requestStatus.textContent == 'Pending') {
        rejectARequest();
        requestStatus.textContent = 'Rejected';
        approveBtn.style.display = 'none';
        rejectBtn.style.display = 'none';
        resolveBtn.style.display = 'none';  
    }
  },
  resolveRequest: () => {
    if (requestStatus.textContent == 'Approved') {
      requestStatus.textContent = 'Resolved';
      approveBtn.style.display = 'none';
      rejectBtn.style.display = 'none';
      resolveBtn.style.display = 'none';
      resolveHeader.style.display = 'block';
      resolveDate.textContent = formatDate(new Date());
    }
  }
}



let modalDiv = document.getElementById('modal-container');
const rejectARequest = () => {
  modalDiv.innerHTML = `
      <div class="modal-div">
        <p id="messageId">Do you really want to reject this request?</p>
        <button id="proceed" onclick="proceedWithRejection();">Proceed</button>
        <button id="close">Cancel</button>
      </div>
  `
  modalDiv.style.display = "block";

  let closeBtn = document.getElementById("close");
  closeBtn.onclick = function() {
    modalDiv.style.display = "none";
  }
}

const proceedWithRejection = () => {
  modalDiv.innerHTML = `
      <div class="modal-div">
        <div> <i class="fa fa-check-circle"></i> </div>
        <p id="messageId">Request marked as rejected</p>
        <button id="closeAfterdelete">close</button>
      </div>
  `
  modalDiv.style.display = "block";

  let closeBtn = document.getElementById("closeAfterdelete");
  closeBtn.onclick = function() {
    modalDiv.style.display = "none";
  }
}