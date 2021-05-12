/* eslint-disable max-len */
/* eslint-disable linebreak-style */
require('dotenv').config();
const express = require('express');

const mongoose = require('mongoose');
// const helmet = require('helmet');
const cors = require('cors');
const { errors } = require('celebrate');
const router = require('./routes/index');
const errorsHandler = require('./middlewares/errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/ratelimiter');

const { PORT = 3002 } = process.env;
const app = express();
const options = {
  origin: '*',
  credentials: true,
};
app.use('*', cors(options));
// app.use(helmet());

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
// eslint-disable-next-line no-console
}).then(() => console.log('Connected to DS')).catch((err) => console.log(err));

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', '*');
//   res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS');
//   if (req.method === 'OPTIONS') {
//     res.send(200);
//   }
//   next();
// });

app.use(express.json()); // для собирания JSON-формата
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorsHandler);
app.use(limiter);
app.listen(PORT, () => (
  // eslint-disable-next-line no-console
  console.log(PORT)
));
