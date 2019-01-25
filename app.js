const express = require('express');
const path = require('path');

const lectures = require('./lectures');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', lectures);

function notFoundHandler(req, res, next) { // eslint-disable-line
  const title = '404 villa';
  const message = 'Síðan fannst ekki';
  res.status(404).render('error', { title, message });
}

function errorHandler(err, req, res, next) { // eslint-disable-line
  console.error(err);
  const title = '500 villa';
  const message = 'Villa hjá vefþjón';
  res.status(500).render('error', { title, message });
}

app.use(notFoundHandler);
app.use(errorHandler);

const hostname = '127.0.0.1';
const port = 3000;

app.listen(port, hostname, () => {
  console.info(`Server running at http://${hostname}:${port}/`);
});
