import app from './app';
import supertest from 'supertest';
import { logger } from './middleware';
//@ts-ignore
import session from 'supertest-session';
import { connectToMongoDB } from './utils';
import mongoose from 'mongoose';
import Book from './model/book.model';
import 'dotenv/config';

jest.mock('./middleware', () => ({
  logger: jest.fn((_, __, next) => next()),
}));

describe('GET /', function () {
  it('responds with html', function (done) {
    supertest(app)
      .get('/')
      .expect('Content-Type', /html/)
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        expect(res.text).toMatch(/Express/);

        return done();
      });
  });

  it('invokes logger', function (done) {
    supertest(app)
      .get('/')
      .end(function (err, _) {
        if (err) return done(err);
        expect(logger).toBeCalledTimes(2);

        return done();
      });
  });
});

describe('testing sessions', () => {
  let api: supertest.SuperTest<supertest.Test>;

  beforeEach(() => {
    api = session(app);
  });

  it('GET /counter returns number', function (done) {
    api.get('/counter').end(function (err, res) {
      if (err) return done(err);
      expect(res.body).toBe(1);

      return done();
    });
  });
});

describe('testing mongoDB', () => {
  const book1 = new Book({
    author: 'Kris Kaspersky',
    title: 'Computer Viruses',
    year: 2007,
  });

  const book2 = new Book({
    author: 'Kris Kaspersky',
    title: 'Computer Viruses',
    year: 2007,
  });

  let api: supertest.SuperTest<supertest.Test>

  beforeAll(async () => {
    api = supertest(app);

    await connectToMongoDB(process.env.MONGODB_TEST_URI as string);
    await Book.deleteMany({});
    await Book.insertMany([book1, book2]);
  });

  afterAll(() => {
    mongoose.connection.close();
  });

  test('should save book in mongodb', async () => {
    const responseBeforeSaving = await api.get('/api/books');

    expect(responseBeforeSaving.body).toHaveLength(2);

    const book3 = {
      author: 'Kris Kaspersky',
      title: 'Computer Viruses',
      year: 2007,
    };

    await api.post('/api/books').send(book3);
    const responseAfterSaving = await api.get('/api/books');

    expect(responseAfterSaving.body).toHaveLength(3);
  });
});
