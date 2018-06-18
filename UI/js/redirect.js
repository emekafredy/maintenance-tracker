const myToken = localStorage.getItem('authToken');

const redirectToHomePage = () => {
  if (!myToken) {
    window.location.replace('index.html');
  }
};

redirectToHomePage();
