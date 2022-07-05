const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const auth = require('./middleware/auth');
const { createUser, login } = require('./controllers/users');
const { requestLogger, errorLogger } = require('./middleware/logger');
const { celebrate, Joi } = require('celebrate');
const NotFoundError = require('./errors/NotFoundError');
require('dotenv').config();

const app = express();
app.use(cors());
app.options('*', cors());
mongoose.connect('mongodb://localhost:27017/aroundb');

const { PORT = 3001 } = process.env;

const route = (req, res) => {
  throw new NotFoundError('Requested Resource Not found', 404);
};

app.use(helmet());
app.use(bodyParser.json());
app.use(requestLogger);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});

app.post('/signup', createUser);
app.post('/signin', login);

app.use('/', auth, usersRouter);
app.use('/', auth, cardsRouter);

app.get('*', route);
app.post('*', route);
app.patch('*', route);
app.delete('*', route);
app.put('*', route);

app.use(errorLogger);
app.use(errors());
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 && !message
      ? 'An error occurred on the server'
      : message,
  });
});
app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
