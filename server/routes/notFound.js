const notFound = (request, response) => {
  response.status(404).send({ message: 'Oops! page not found' });
};

export default notFound;
