const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const auth = require('./middleware/auth');
const app = express();
var cors = require('cors');

mongoose.connect("mongodb://localhost:27017/aroundb");

const { PORT = 3000 } = process.env;
const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");
const { createUser, login } = require("./controllers/users");

app.use(cors());
app.options('*', cors());
const route = (req, res) => {
  console.log(res.status);
  res.status(404).send({ message: "Requested resource not found" });
};

app.use(helmet());
app.use(bodyParser.json());
app.post("/signup", createUser);
app.post("/signin", login);
app.use(auth);
app.use("/", usersRouter);
app.use("/", cardsRouter);
app.get("*", route);
app.use((err, req, res, next) => {
  res.send({ message: err.message });
});
app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
