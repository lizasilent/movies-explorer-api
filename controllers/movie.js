/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */

const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-err');
const BadRequest = require('../errors/bad-request');
const Forbidden = require('../errors/forbidden');

// Получить список всех фильмов
const getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => {
      if (!movies) {
        throw new NotFoundError('Запрашиваемый файл не найден');
      }

      res.status(200).send(movies);
    })
    .catch(next);
};

// Создать фильм
const createMovie = (req, res, next) => {
  const owner = req.user._id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((movie) => {
      if (!movie) {
        throw new BadRequest('Данные не прошли валидацию');
      }
      res.status(200).send(movie);
    })
    .catch(next);
};

// Удалить карточку
const deleteMovie = (req, res, next) => {
  const owner = req.user._id;

  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Фильм не найден');
      }
      if (movie.owner.toString() !== owner) {
        throw new Forbidden('Нет доступа к удалению фильма');
      }
      Movie.findByIdAndRemove(req.params.movieId)
        .then(() => res.status(200).send({ message: 'Фильм удален' }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new NotFoundError('Id фильма не валидный'));
      }
      next(err);
    });
};

module.exports = {
  getMovies, createMovie, deleteMovie,
};
