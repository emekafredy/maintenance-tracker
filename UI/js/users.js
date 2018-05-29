const modalDiv = document.getElementById('modal-container');
const deleteRequest = () => {
  modalDiv.innerHTML = `
      <div class="modal-div">
        <p id="messageId">Do you really want to delete this request?</p>
        <button id="proceed" onclick="proceedWithDelete();">Proceed</button>
        <button id="close">Cancel</button>
      </div>
  `;
  modalDiv.style.display = 'block';

  const closeBtn = document.getElementById('close');
  closeBtn.addEventListener('click', () => {
    modalDiv.style.display = 'none';
  });
  deleteRequest();
};


const proceedWithDelete = () => {
  modalDiv.innerHTML = `
      <div class="modal-div">
        <div> <i class="fa fa-check-circle"></i> </div>
        <p id="messageId">Request successfully deleted</p>
        <button id="closeAfterdelete">close</button>
      </div>
  `;
  modalDiv.style.display = 'block';

  const closeBtn = document.getElementById('closeAfterdelete');
  closeBtn.addEventListener('click', () => {
    modalDiv.style.display = 'none';
  });
  proceedWithDelete();
};

