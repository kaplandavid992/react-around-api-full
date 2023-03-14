const cardsRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { validateURL } = require('../middleware/validate');
const {
  getCards,
  addCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

cardsRouter.get('/cards', getCards);

cardsRouter.post(
  '/cards',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().custom(validateURL),
    }),
  }),
  addCard,
);

cardsRouter.delete(
  '/cards/:cardId',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().alphanum().length(24).hex(),
    }),
  }),
  deleteCard,
);

cardsRouter.put(
  '/cards/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().alphanum().length(24).hex(),
    }),
  }),
  likeCard,
);

cardsRouter.delete(
  '/cards/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().alphanum().length(24).hex(),
    }),
  }),
  dislikeCard,
);

module.exports = cardsRouter;
