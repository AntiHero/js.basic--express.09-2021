import { Router } from 'express';
import Book from '../model/book.model';

const booksRouter = Router();

booksRouter.post('/', (req, res) => {
  const { author, title, year } = req.body;

  const book = new Book({
    author,
    year,
    title,
  });

  book
    .save()
    .then((savedBook) => {
      res.json(savedBook);
    })
    .catch((e) => {
      console.log(e);
      res.status(400).send('Bad request');
    });
});

booksRouter.get('/', (req, res) => {
  Book.find({})
    .then((books) => {
      res.json(books);
    })
    .catch((e) => {
      console.log(e);
      res.status(400).send('Bad request');
    });
});

booksRouter.get('/:id', (req, res) => {
  Book.find({ _id: req.params.id })
    .then((book) => res.json(book))
    .catch((e) => {
      console.log(e);
      res.status(400).send('Bad request');
    });
});

export default booksRouter;
