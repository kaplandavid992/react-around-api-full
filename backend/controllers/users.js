const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');
const UnauthorizedError = require('../errors/UnauthorizedError');

const { NODE_ENV, JWT_SECRET } = process.env;
const options = { runValidators: true, new: true };

const getUsers = async (req, res, next) => {
  await User.find({})
    .orFail(() => {
      throw new NotFoundError('No users found');
    })
    .then((users) => res.send(users))
    .catch(next);
};

const getCurrentUser = async (req, res, next) => {
  await User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('No user found with that id');
      }
      res.send({ data: user });
    })
    .catch((err) => {
      next(err);
    });
};

const getUserById = async (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(() => {
      throw new NotFoundError('No user with matching ID found');
    })
    .then((user) => res.send({ user }))
    .catch((err) => {
      next(err);
    });
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, password,
  } = req.body;
  let email;
  if (!validator.isEmail(req.body.email)) {
    email = null;
  } else {
    email = req.body.email;
  }
  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ConflictError('User already exists');
      }
      return bcrypt.hash(password, 10);
    }).then((hash) => User.create({
      email,
      password: hash,
      name,
      about,
      avatar,
    }))
    .then((res) => res.send({
      data: {
        email, name, about, avatar,
      },
    }))
    .catch(next);
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
  if (!email || !password) {
    throw new UnauthorizedError('Not authorized');
  }
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        {
          _id: user._id,
        },
        NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-secret',
        { expiresIn: '7d' },
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
