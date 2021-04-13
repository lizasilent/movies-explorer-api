/* eslint-disable linebreak-style */
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({

  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(v) {
      // eslint-disable-next-line no-useless-escape
        return /^https?:\/\/(www\.)?([a-zA-Z0-9\-])+\.([a-zA-Z])+\/?([a-zA-Z0-9\-\._~:\/\?#\[\]@!\$&’\(\)\*\+,;=]+)/.test(v);
      },
      message: (props) => `Ошибка в ссылке ${props.value}`,
    },
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator(v) {
      // eslint-disable-next-line no-useless-escape
        return /^https?:\/\/(www\.)?([a-zA-Z0-9\-])+\.([a-zA-Z])+\/?([a-zA-Z0-9\-\._~:\/\?#\[\]@!\$&’\(\)\*\+,;=]+)/.test(v);
      },
      message: (props) => `Ошибка в ссылке ${props.value}`,
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(v) {
      // eslint-disable-next-line no-useless-escape
        return /^https?:\/\/(www\.)?([a-zA-Z0-9\-])+\.([a-zA-Z])+\/?([a-zA-Z0-9\-\._~:\/\?#\[\]@!\$&’\(\)\*\+,;=]+)/.test(v);
      },
      message: (props) => `Ошибка в ссылке ${props.value}`,
    },
  },
  movieId: {
    type: String,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },

});

module.exports = mongoose.model('movie', movieSchema);
