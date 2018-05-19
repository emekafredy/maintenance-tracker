const submitRequest = document.getElementById('submitRequest');
submitRequest.addEventListener('click', () => {
  createRequestModal();
});


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

  window.onclick = function (event) {
    if (event.target === modalDiv) {
      modalDiv.style.display = 'none';
    }
  };


  const closeBtn = document.getElementById('close');
  closeBtn.onclick = function () {
    modalDiv.style.display = 'none';
  };
};
