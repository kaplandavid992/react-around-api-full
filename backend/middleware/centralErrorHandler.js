
const centralErrorHandler = (err, res) => {
  console.log(err);
  if (err.name === 'ValidationError') {
    res.status(400).send({ message: 'Invalid data' });
  }
  if (err.name ==='Unauthorized') {
    res.status(401).send({ message: 'Not Authorized'});
  }

  if (err.name ==='Not found') {
    res.status(404).send({ message: 'Not found'});
  }
  if (err.name === 'MongoServerError') {
    res.status(409).send({ message: 'This email already in use' });
  }
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'An error occurred on the server'
        : message,
    });
};
module.exports = centralErrorHandler;


