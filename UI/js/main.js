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
  }
}

const processRequests = () => {
  window.location.href = 'process-requests.html';
}

filterRequest = () => {
  const filterTable = ((list) => {
    let _input;
  
    const onInput = (event) => {
  
      _input = event.target;
      let tables = document.getElementsByClassName(_input.getAttribute('data-table'));
  
      list.forEach.call(tables, (table) => {
        list.forEach.call(table.tBodies, (tbody) => {
          list.forEach.call(tbody.rows, filterRow);
        });
      });
    }
  
    const filterRow = (row) => {
      let text = row.textContent.toLowerCase();
      let val = _input.value.toLowerCase();
  
      row.style.display = text.indexOf(val) === -1 ? 'none' : 'table-row';
    }

    return {
			init: () => {
				var inputs = document.getElementsByClassName('table-search');
				list.forEach.call(inputs, function(input) {
					input.oninput = onInput;
				});
			}
    }  
  })(Array.prototype);
  
  document.addEventListener('readystatechange', function() {
		if (document.readyState === 'complete') {
			filterTable.init();
		}
	});
}

filterRequest();