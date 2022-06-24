const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const User = require('../models/user');
const { ClassError } = require('../utils/ClassError');

const { NODE_ENV, JWT_SECRET } = process.env;
const {
  validationError,
  defaultError,
  errorsHandle,
} = require('../middleware/errorHandling');

const options = { runValidators: true, new: true };

const getUsers = async (req, res, next) => {
  try {
    await User.find({})
      .orFail(() => {
        const error = new Error('No users found');
        error.statusCode = 404;
      })
      .then((users) => res.send(users));
  } catch (err) {
    next(err);
  }
};

// const getCurrentUser = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     await User.findOne({ email })
//       .select('+password')
//       .orFail(() => {
//         const error = new Error('No user found');
//         error.statusCode = 404;
//       })
//       .then((user) => res.send(user));
//   } catch (error) {
//     defaultError(res);
//   }
// };

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new ClassError(404, 'No user found with that id');
      }
      res.send({ user });
    })
    .catch((err) => {
      next(err);
    });
};

const getUserById = async (req, res) => {
  await User.findById(req.params.userId)
    .orFail(() => {
      const error = new Error('user id not found');
      error.statusCode = 404;
      throw new ClassError('No user with matching ID found');
    })
    .then((user) => res.send(user))
    .catch((err) => errorsHandle(err, res, 'User'));
};

const createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;
  let email;
  if (!validator.isEmail(req.body.email)) {
    email = null;
  } else { email = req.body.email; }
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
      about,
      avatar,
    }))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      next(err);
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
