/* eslint-disable linebreak-style */
const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movie');

router.get('/movies', getMovies);

router.post('/movies', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(/^(http|https):\/\/[^ "]+$/),
    trailer: Joi.string().required().pattern(/^(http|https):\/\/[^ "]+$/),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().alphanum().required(),
    thumbnail: Joi.string().required().pattern(/^(http|https):\/\/[^ "]+$/),
    movieId: Joi.string().required(),
  }),
}), createMovie);

router.delete('/movies/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length().hex(),
  }),
}), deleteMovie);

module.exports = router;