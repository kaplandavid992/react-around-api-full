const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const auth = require("./middleware/auth");
const app = express();
const cors = require("cors");
const { errors } = require("celebrate");
const { requestLogger, errorLogger } = require('./middlewares/logger');

mongoose.connect("mongodb://localhost:27017/aroundb");

const { PORT = 3000 } = process.env;
const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");
const { createUser, login } = require("./controllers/users");

const route = (req, res) => {
  console.log(res.status);
  res.status(404).send({ message: "Requested resource not found" });
};

app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.options("*", cors());
app.use(requestLogger);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});
app.post("/api/signup", createUser);
app.post("/api/signin", login);
app.use(auth);

app.get('/api/users/me', usersRouter);
app.get('/api/users', usersRouter);
app.post('/api/users', usersRouter);
app.post('/api/cards', cardsRouter);
app.delete('/api/cards/:cardsId', cardsRouter);
app.get('/api/cards', cardsRouter);
app.get('/api/users/:id', usersRouter);
app.patch('/api/users/me', usersRouter);
app.patch('/api/users/me/avatar', usersRouter);
app.put('/api/cards/:cardId/likes', cardsRouter);
app.delete('/api/cards/:cardId/likes', cardsRouter);

app.use("/api", usersRouter);
app.use("/api", cardsRouter);
app.get("*", route);
app.use(errorLogger);
app.use(errors());
app.use((err, req, res, next) => {
  res.send({ message: err.message });
});
app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
