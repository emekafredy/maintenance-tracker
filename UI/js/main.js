const getPages = {
  signUpPage: () => {
    window.location.href = 'sign-up.html';
  },
  signUpUser: () => {
    window.location.href = 'user-requests.html';
  },
  loginUser: () => {
    window.location.href = 'user-requests.html';
  },
  getDetails: () => {
    window.location.href = 'request-details.html';
  },
  backToRequests: () => {
    window.location.href = 'user-requests.html';
  },
  backToAdmin: () => {
    window.location.href = 'admin-panel.html';
  },
};
getPages();

const processRequests = () => {
  window.location.href = 'process-requests.html';
};
processRequests();

const filterRequest = () => {
  const filterTable = ((list) => {
    let inputValue;

    const filterRow = (row) => {
      const text = row.textContent.toLowerCase();
      const val = inputValue.value.toLowerCase();

      row.style.display = text.indexOf(val) === -1 ? 'none' : 'table-row';
    };

    const onInput = (event) => {
      inputValue = event.target;
      const tables = document.getElementsByClassName(inputValue.getAttribute('data-table'));

      list.forEach.call(tables, (table) => {
        list.forEach.call(table.tBodies, (tbody) => {
          list.forEach.call(tbody.rows, filterRow);
        });
      });
    };

    return {
      init: () => {
        const inputs = document.getElementsByClassName('table-search');
        list.forEach.call(inputs, (input) => {
          input.oninput = onInput;
        });
      },
    };
  })(Array.prototype);

  document.addEventListener('readystatechange', () => {
    if (document.readyState === 'complete') {
      filterTable.init();
    }
  });
};

filterRequest();
