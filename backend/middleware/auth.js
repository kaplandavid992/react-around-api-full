const jwt = require('jsonwebtoken');
const { ClassError } = require('../utils/ClassError');

const { NODE_ENV, JWT_SECRET } = process.env;

const handleAuthError = (res) => {
  res.status(401).send({ message: 'Authorization Error' });
};

const extractBearerToken = (header) => header.replace('Bearer ', '');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return handleAuthError(res);
  }
  const token = extractBearerToken(authorization);
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-secret');
    if (!payload) {
      throw new ClassError(401, 'Authorization Required');
    }
  } catch (err) {
  }
  req.user = payload;
  next();
};
