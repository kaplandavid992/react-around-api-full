const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;
const {
  validationError,
  defaultError,
  errorsHandle,
} = require('../middleware/errorHandling');

const options = { runValidators: true, new: true };

const getUsers = async (req, res) => {
  try {
    await User.find({})
      .orFail(() => {
        const error = new Error('No users found');
        error.statusCode = 404;
      })
      .then((users) => res.send(users));
  } catch (error) {
    defaultError(res);
  }
};

const getCurrentUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    await User.findOne({ email })
      .select('+password')
      .orFail(() => {
        const error = new Error('No user found');
        error.statusCode = 404;
      })
      .then((user) => res.send(user));
  } catch (error) {
    defaultError(res);
  }
};

const getUserById = async (req, res) => {
  await User.findById(req.params.userId)
    .orFail(() => {
      const error = new Error('user id not found');
      error.statusCode = 404;
      throw new NotFoundError('No user with matching ID found');
    })
    .then((user) => res.send(user))
    .catch((err) => errorsHandle(err, res, 'User'));
};

const createUser = (req, res) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => User.create({
      email: req.body.email,
      password: hash,
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
    }))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      validationError(err, res);
    });
};

const updateProfile = async (req, res) => {
  const { name, about } = req.body;
  await User.findByIdAndUpdate(req.user._id, { name, about }, options)
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      validationError(err, res);
    });
};

const updateAvatar = async (req, res) => {
  const { avatar } = req.body;
  await User.findByIdAndUpdate(req.user._id, { avatar }, options)
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      validationError(err, res);
    });
};

const login = (req, res) => {
  const { email, password } = req.body;
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
      res.status(401).send({ message: err.message });
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
