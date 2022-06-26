const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const app = express();
const cors = require('cors');
require('dotenv').config();
const { errors } = require('celebrate');
const auth = require('./middleware/auth');
const { requestLogger, errorLogger } = require('./middleware/logger');

mongoose.connect('mongodb://localhost:27017/aroundb');

const { PORT = 3001 } = process.env;
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { createUser, login } = require('./controllers/users');

const route = (req, res) => {
  console.log(res.status);
  res.status(404).send({ message: 'Requested resource not found' });
};

app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.options('*', cors());
app.use(requestLogger);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});
app.post('/signup', createUser);
app.post('/signin', login);
app.use(auth);

app.get('/users/me', usersRouter);
app.get('/users', usersRouter);
app.post('/users', usersRouter);
app.post('/cards', cardsRouter);
app.delete('/cards/:cardsId', cardsRouter);
app.get('/cards', cardsRouter);
app.get('/users/:id', usersRouter);
app.patch('/users/me', usersRouter);
app.patch('/users/me/avatar', usersRouter);
app.put('/cards/:cardId/likes', cardsRouter);
app.delete('/cards/:cardId/likes', cardsRouter);

app.get('*', route);
app.use(errorLogger);
app.use(errors());
app.use((err, req, res, next) => {
  res.send({ message: err.message });
});
app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
