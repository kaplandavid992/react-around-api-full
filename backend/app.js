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
app.post("/signup/api", createUser);
app.post("/signin/api", login);
app.use(auth);

app.get('/users/me/api', usersRouter);
app.get('/users/api', usersRouter);
app.post('/users/api', usersRouter);
app.post('/cards/api', cardsRouter);
app.delete('/cards/:cardsId/api', cardsRouter);
app.get('/cards/api', cardsRouter);
app.get('/users/:id/api', usersRouter);
app.patch('/users/me/api', usersRouter);
app.patch('/users/me/avatar/api', usersRouter);
app.put('/cards/:cardId/likes/api', cardsRouter);
app.delete('/cards/:cardId/likes/api', cardsRouter);

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
