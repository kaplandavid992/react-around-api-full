const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const User = require("../models/user");
const { ClassError } = require("../utils/ClassError");

const { NODE_ENV, JWT_SECRET } = process.env;
const options = { runValidators: true, new: true };

const getUsers = async(req, res, next) => {
  try {
    await User.find({})
      .orFail(() => {
        const error = new Error("No users found");
        error.statusCode = 404;
      })
      .then((users) => res.send(users));
  } catch (err) {
    next(err);
  }
};

const getCurrentUser = async (req, res, next) => {
  await User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new ClassError(404, "No user found with that id");
      }
      res.send({ data: user });
    })
    .catch((err) => {
      next(err);
    });
};

const getUserById = async(req, res, next) => {
  User.findById(req.params.userId)
    .orFail(() => {
      const error = new Error("user id not found");
      error.statusCode = 404;
      throw new ClassError("No user with matching ID found");
    })
    .then((user) => res.send({user}))
    .catch((err) => {
      next(err);
    });
};

const createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;
  let email;
  if (!validator.isEmail(req.body.email)) {
    email = null;
  } else {
    email = req.body.email;
  }
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) =>
      User.create({
        email,
        password: hash,
        name,
        about,
        avatar,
      })
    )
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      next(err);
    });
};

const updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, options)
    .then((user) => res.send(user))
    .catch((err) => {
      next(err);
    });
};

const updateAvatar = async (req, res, next) => {
  const { avatar } = req.body;
   await User.findByIdAndUpdate(req.user._id, { avatar }, options)
    .then((user) => res.send(user))
    .catch((err) => {
      next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        {
          _id: user._id,
        },
        NODE_ENV === "production" ? JWT_SECRET : "super-strong-secret",
        { expiresIn: "7d" }
      );
      res.send({ token });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  login,
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
  getCurrentUser,
};
