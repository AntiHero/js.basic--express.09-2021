import app from './app';
import supertest from 'supertest';
import { logger } from './middleware';

jest.mock('./middleware', () => ({
  logger: jest.fn((_, __, next) => next()),
}))

describe('GET /', function () {
  it('responds with html', function (done) {
    supertest(app)
      .get('/')
      .expect('Content-Type', /html/)
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        expect(res.text).toMatch(/Express/)

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
