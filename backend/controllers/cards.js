const {
  validationError,
  defaultError,
  errorsHandle,
} = require("../middleware/errorHandling");
const Card = require("../models/card");

const getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    res.send(cards);
  } catch (error) {
    defaultError(res);
  }
};

const addCard = async (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  await Card.create({
    name,
    link,
    owner,
  })
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      validationError(err);
    });
};

const deleteCard = async (req, res) => {
  await Card.deleteOne({ id: req.params.cardId })
    .then((card) => res.send({ data: card }))
    .catch((err) => errorsHandle(err, res, "Card"));
};

likeCard = async (req, res, next) => {
  await Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      if (!card) {
        throw new AppError(404, "Card not found");
      }
      res.send(card);
    })
    .catch((err) => {
      next(err);
    });
};

dislikeCard = async (req, res, next) => {
  await Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      if (!card) {
        throw new AppError(404, "Card not found");
      }
      res.send(card);
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  getCards,
  addCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
