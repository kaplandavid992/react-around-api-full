const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const { validateURL } = require("../middleware/validateURL");
const {
  getCards,
  addCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require("../controllers/cards");

router.get("/cards", getCards);
router.post(
  "/cards",
  celebrate({
    body: Joi.object().keys({
      link: Joi.string().required().custom(validateURL),
    }),
  }),
  addCard
);

router.delete("/cards/:cardId", deleteCard);
router.put("/cards/:cardId/likes", likeCard);
router.delete("/cards/:cardId/likes", dislikeCard);

module.exports = router;
