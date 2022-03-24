import { resolve } from 'node:path';
import express from 'express';
import * as middlwares from './middleware';
import cookieSession from 'express-session';
import booksRouter from './controllers/books.controllers';
import './types/index';

const app = express();

const oneDay = 1000 * 60 * 60 * 24;

app.use(
  cookieSession({
    name: 'kewlCookie',
    secret: 'sfajnh4faAN99',
    cookie: { maxAge: oneDay },
  })
);

app.use(middlwares.logger);
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/books', booksRouter);

app.get('/secret', (req, res) => {
  if (req.session) {
    console.log(req.session.isAuthed);
    if (req.session.isAuthed) {
      res.status(200).json('Secret!');
    }
  }

  res.end();
});

app.post('/login', (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;

  // get hashPassword

  const hashPassword = '123';

  if (password === hashPassword) {
    req.session.isAuthed = true;
    res.status(200).json('ok');
  }

  res.end();
});

app.get('/counter', (req, res) => {
  if (req.session) {
    req.session.counter = req.session.counter || 0;

    if (req.session.counter !== undefined) {
      req.session.counter += 1;
    }

    res.status(200).json(req.session.counter);
  }

  res.end();
});

app.get('*/style.css', (req, res) => {
  res.sendFile(resolve(__dirname, '../public/style.css'));
});

app.get('*', (req, res) => {
  res.sendFile(resolve(__dirname, '../public/404.html'));
});

export default app;
