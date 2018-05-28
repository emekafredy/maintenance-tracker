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


const submitRequest = document.getElementById('submitRequest');
submitRequest.addEventListener('click', () => {
  createRequestModal();
});
