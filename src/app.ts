import { resolve } from 'node:path';
import express from 'express';
import * as middlwares from './middleware';

const app = express();

app.use(middlwares.logger);
app.use(express.static('public'));

app.get('/counter', (req, res) => {
});

app.get('*/style.css', (req, res) => {
  res.sendFile(resolve(__dirname, '../public/style.css'));
});

app.get('*', (req, res) => {
  res.sendFile(resolve(__dirname, '../public/404.html'));
});

export default app;