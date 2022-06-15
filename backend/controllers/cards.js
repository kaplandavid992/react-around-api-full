const { validationError, defaultError, errorsHandle } = require('../utils/errorHandling');
const Card = require('../models/card');

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
  const owner = { _id: req.user._id };
  const likes = [];
  const createdAt = Date.now();
  await Card.create({
    name, link, owner, likes, createdAt,
  })
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => {
      validationError(err);
    });
};

const deleteCard = async (req, res) => {
  await Card.deleteOne({ id: req.params.cardId })
    .then((card) => res.send({ data: card }))
    .catch((err) => errorsHandle(err, res, 'Card'));
};

const likeCard = async (req, res) => {
  await Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.send({ data: card }))
    .catch((err) => errorsHandle(err, res, 'Card'));
};

const dislikeCard = async (req, res) => {
  await Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.send({ data: card }))
    .catch((err) => errorsHandle(err, res, 'Card'));
};

module.exports = {
  getCards, addCard, deleteCard, likeCard, dislikeCard,
};
