function defaultError(res) {
  return res.status(500).send({ message: 'An error has occurred on the server' });
}

function validationError(err, res) {
  if (err.name === 'ValidationError') {
    res.status(400).send(err);
  } else if (err.name === 'CastError') {
    res.status(400).send({ message: 'NotValid Data' });
  } else { defaultError(res); }
}

function errorsHandle(err, res, type) {
  if (err.name === 'CastError') {
    res.status(400).send({ message: 'NotValid Data' });
  } if (err.name === 'DocumentNotFoundError') {
    res.status(404).send({ message: `${type} not found` });
  } else {
    defaultError(res);
  }
}

module.exports = { defaultError, errorsHandle, validationError };
