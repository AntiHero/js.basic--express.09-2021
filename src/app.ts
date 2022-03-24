import http from 'node:http';
import fs from 'node:fs';
import { resolve } from 'node:path';

const PORT = process.env.PORT || 3000;

const indexPage = fs.readFileSync(resolve(__dirname, '../public/index.html'));
const styles = fs.readFileSync(resolve(__dirname, '../public/style.css'));
const programmer = fs.readFileSync(resolve(__dirname, '../public/programmer.gif'));

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(indexPage);
  } else if (req.url === '/style.css') {
    res.writeHead(200, { 'Content-Type': 'text/css' });
    res.write(styles);
  } else if (req.url === '/programmer.gif') {
    res.writeHead(200, { 'Content-Type': 'image/gif' });
    res.write(programmer);
  }

  res.end();
});

server.listen(PORT, () => {
  console.log('Server is running at http://localhost:%s', PORT);
});
