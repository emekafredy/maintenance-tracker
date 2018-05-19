const notFound = (request, response) => {
  response.status(404).send({ message: 'Sorry, this page does not exist' });
};

export default notFound;
