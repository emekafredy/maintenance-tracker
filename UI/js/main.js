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
  processRequests: () => {
    window.location.href = 'process-requests.html';
  },
};
getPages();

