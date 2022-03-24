import { resolve } from 'node:path';
import express from 'express';
import * as middlwares from './middleware';
import session from 'express-session';

const app = express();

const oneDay = 1000 * 60 * 60 * 24;

app.use(
  session({
    name: 'kewlCookie',
    secret: 'sfajnh4faAN99',
    cookie: { maxAge: oneDay },
    resave: false,
    saveUninitialized: false,
  })
);

app.use(middlwares.logger);
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/secret', (req, res) => {
  if (req.session) {
    console.log((req.session as any).isAuthed);
    if ((req.session as any).isAuthed) {
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
    (req.session as any).isAuthed = true;
    res.status(200).json('ok');
  }

  res.end();
});

app.get('/counter', (req, res) => {
  if (req.session) {
    (req.session as any).counter = (req.session as any).counter || 0;
    (req.session as any).counter += 1;

    res.status(200).json((req.session as any).counter);
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
