const requestStatus = document.getElementById('request-status');
const resolveHeader = document.getElementById('resolveHeader');
const resolveDate = document.getElementById('resolveDate');

const approveBtn = document.getElementById('approveBtn');
const rejectBtn = document.getElementById('rejectBtn');
const resolveBtn = document.getElementById('resolveBtn');

const formatDate = (date) => {
  const monthNames = [
    'January', 'February', 'March',
    'April', 'May', 'June', 'July',
    'August', 'September', 'October',
    'November', 'December',
  ];

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  return `${day} ${monthNames[monthIndex]} ${year}`;
};


const process = {
  approveRequest: () => {
    if (requestStatus.textContent === 'Pending') {
      requestStatus.textContent = 'Approved';
      approveBtn.style.display = 'none';
      rejectBtn.style.display = 'none';
      resolveBtn.style.display = 'block';
    }
  },
  rejectRequest: () => {
    if (requestStatus.textContent === 'Pending') {
      requestStatus.textContent = 'Rejected';
      approveBtn.style.display = 'none';
      rejectBtn.style.display = 'none';
      resolveBtn.style.display = 'none';
    }
  },
  resolveRequest: () => {
    if (requestStatus.textContent === 'Approved') {
      requestStatus.textContent = 'Resolved';
      approveBtn.style.display = 'none';
      rejectBtn.style.display = 'none';
      resolveBtn.style.display = 'none';
      resolveHeader.style.display = 'block';
      resolveDate.textContent = formatDate(new Date());
    }
  },
};
