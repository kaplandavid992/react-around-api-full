const {
  validationError,
  defaultError,
  errorsHandle,
} = require("../middleware/centralErrorHandler");
const Card = require("../models/card");
const { ClassError } = require("../utils/ClassError");

const getCards = async (req, res) => {
  await Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => next(err));
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
      next(err);
    });
};

const deleteCard = async (req, res, next) => {
  await Card.deleteOne({ id: req.params.cardId }).then((card) => {
    if (!card) {
      throw new ClassError(404, "Card not found with that id");
    }
    return Card.findOneAndDelete(req.params.cardId)
      .then((card) => res.send({ data: card }))
      .catch(next);
  });
};

likeCard = async (req, res, next) => {
  await Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      if (!card) {
        throw new ClassError("Card not found", 404);
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
        throw new ClassError("Card not found", 404);
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
