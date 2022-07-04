const Card = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

const getCards = async (req, res, next) => {
  await Card.find({})
    .orFail(() => {
      throw new NotFoundError('No cards found');
    })
    .then((cards) => res.send(cards))
    .catch((err) => next(err));
};

const addCard = async (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  await Card.create({
    name,
    link,
    owner,
  }).then((card) => {
    res.send(card);
  })
    .catch((err) => {
      next(err);
    });
};

const deleteCard = async (req, res, next) => {
  await Card.findOne({ _id: req.params.cardId }).then((card) => {
    const ownerId = card.owner.toString();
    if (!card) {
      throw new NotFoundError('Card not found with that id');
    }
    if (ownerId !== req.user._id) {
      throw new ForbiddenError('Forbidden');
    }
    return Card.findOneAndDelete(req.params.cardId)
      .then((cardDeleted) => res.send({ data: cardDeleted }))
      .catch(next);
  });
};

const likeCard = async (req, res, next) => {
  await Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Card not found');
      }
      res.send(card);
    })
    .catch((err) => {
      next(err);
    });
};

const dislikeCard = async (req, res, next) => {
  await Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Card not found');
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
