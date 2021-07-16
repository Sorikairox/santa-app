import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { bootstrap } from '../src/bootstrap';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await bootstrap();
  });

  afterAll(() => {
    app.close();
  });

  describe('/ (POST)', () => {
    it('returns 201 for < 10 years old child account', () =>
    {
      return request(app.getHttpServer())
        .post('/')
        .send({
          username: 'charlie.brown',
          request: 'a nice request'
        })
        .expect(201);
    });
    it('returns 400 for unknown account', () => {
      return request(app.getHttpServer())
        .post('/')
        .send({
          username: 'charlerrrrrrrrrrrrrie.brown',
          request: 'a nice request'
        })
        .expect(400);
    });
    it ('returns 400 for too old person account', () => {
      return request(app.getHttpServer())
        .post('/')
        .send({
          username: 'james.bond',
          request: 'a nice request'
        })
        .expect(400);
    });
  });
});
