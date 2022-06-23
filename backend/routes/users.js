const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { validateURL } = require('../middleware/validateURL');
const {
  getUsers, getUserById, getCurrentUser, updateProfile, updateAvatar,
} = require('../controllers/users');

router.get('/users/me', getCurrentUser);
router.get('/users', getUsers);
router.get('/users/:userId', getUserById);
router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2),
  }),
}),updateProfile);

router.patch('/users/me/avatar',celebrate({
  body: Joi.object().keys({
   link:Joi.string().required().custom(validateURL)
  })}),updateAvatar);

module.exports = router;


