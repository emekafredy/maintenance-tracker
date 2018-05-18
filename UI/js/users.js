


let removeRequest = document.getElementById('removeRequest');
removeRequest.addEventListener('click', () => {
  deleteRequest();
})

const deleteRequest = () => {
  let modalDiv = document.getElementById('modal-container');
  modalDiv.innerHTML = `
      <div class="modal-div">
        <div> <i class="fa fa-check-circle"></i> </div>
        <p id="messageId">Request Successfully deleted</p>
        <button id="close">close</button>
      </div>
  `
  let message = confirm("Do you really want to delete this request?");

  if (message === true) {
    return modalDiv.style.display = "block";
    window.onclick = function(event) {
      if (event.target == modalDiv) {
        modalDiv.style.display = "none";
      }
    } 
  
  
    var closeBtn = document.getElementById("close");
    closeBtn.onclick = function() {
      modalDiv.style.display = "none";
    }
  }
  return null;
  
}
