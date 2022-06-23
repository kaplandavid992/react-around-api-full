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

router.get("/api/cards", getCards);
router.post(
  "/api/cards",
  celebrate({
    body: Joi.object().keys({
      link: Joi.string().required().custom(validateURL),
    }),
  }),
  addCard
);

router.delete("/api/cards/:cardId", deleteCard);
router.put("/api/cards/:cardId/likes", likeCard);
router.delete("/api/cards/:cardId/likes", dislikeCard);

module.exports = router;
