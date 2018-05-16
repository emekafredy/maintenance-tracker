let submitRequest = document.getElementById('submitRequest');

submitRequest.addEventListener('click', () => {
  alert('hello');
})

class Modal {
  constructor() {
    this.modalContainer = document.createElement('div');
    this.modalContainer.className = 'modal';
    document.body.appendChild(this.modalContainer);

    const modalContent = document.createElement('div');
    modalContent.className = 'mod-content';
    this.modalContainer.appendChild(modalContent);

    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '&times;';
    modalContent.appendChild(closeBtn);
    closeBtn.addEventListener('click', this.close);

    this.message = document.createElement('div');
    modalContent.appendChild(this.message);
  }

  set html() {
    this.message.innerHTML = value;
  }

  open () {
    this.modalContainer.classList.add('open');
  }

  close () {
    this.modalContainer.classList.remove('open');
  }
}

let m = new Modal;
m.html = 'Hello World';
m.open();