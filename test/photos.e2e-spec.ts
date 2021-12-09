import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { AuthLoginDto, AuthLoginResponse, AuthRegisterDto, AuthRegisterResponse } from '../src/users/dto/auth.dto';
import { User } from '../src/users/entities/user.entity';
import { AuthService } from '../src/users/services/auth.service';
import { readFileSync } from 'fs';

describe('PhotosController (e2e)', () => {
  
  let app: INestApplication;
  let token: string;

  beforeEach(async () => {

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    const authService = await app.get(AuthService);
    token = await authService.encodeUserToken({id: 1} as User);

    await app.init();
    
  });

  it('/photos/upload (POST) should upload photo', () => {

    const fixtureFileName = 'test-photo.png';
    const fixtureFilePath = `./test/fixtures/${fixtureFileName}`;

    const reqBody = {
      description: 'sdfs',
      title: 'opis'
    };
    const resBody = {
      photo: expect.any(Object),
      body: reqBody
    };

    return request(app.getHttpServer())
      .post('/photos/upload')
      .field('description', reqBody.description)
      .field('title', reqBody.title)
      .attach('file', readFileSync(fixtureFilePath), fixtureFileName)
      .set('Authorization', `Bearer ${token}`)
      .then((res) => {
        expect(res.body).toMatchObject(resBody);
        // TODO sprawedzic czy istniej eplik + czy sa miniaturki w storage
      });
  });

});
