const usersRouter = require('express').Router();

const { celebrate, Joi } = require('celebrate');
const { validateURL } = require('../middleware/validate');
const {
  getUsers, getUserById, getCurrentUser, updateProfile, updateAvatar,
} = require('../controllers/users');

usersRouter.get('/users/me', getCurrentUser);
usersRouter.get('/users/', getUsers);
usersRouter.get('/users/:userId', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2),
  }),
}), getUserById);
usersRouter.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2),
    avatar: Joi.string().required().custom(validateURL),
  }),
}), updateProfile);

usersRouter.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(validateURL),
  }),
}), updateAvatar);

module.exports = usersRouter;
