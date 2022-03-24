import app from './app';
import supertest from 'supertest';
import { logger } from './middleware';
//@ts-ignore
import session from 'supertest-session';

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
});
