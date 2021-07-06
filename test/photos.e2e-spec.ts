import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { promisify } from 'util';
import { readFileSync, stat } from 'fs';
const statAsync = promisify(stat);
import { resolve, join } from 'path';
import { ConfigService } from '../src/config';

describe('PhotosController (e2e)', () => {
  let app: INestApplication;
  let config: ConfigService;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    config = app.get(ConfigService);
    await app.init();
  });

  /**
   * upload photo
   */
  it('should upload photo', () => {
    const fileName = 'upload-test.png';
    const resBody = {
      avatar: {
        "fileName": expect.any(String),
      },
      body: {    
        "myFile": 'my-file-name.png',
      },
      file: expect.any(Object),
      thumb: {
        "thumbName": expect.any(String),
      },
    };

    return request(app.getHttpServer())
      .post('/photos/upload-user-avatar')
      .field('myFile', 'my-file-name.png')
      .attach('file', readFileSync(resolve('./test/fixtures/' + fileName)), fileName)
      .then(async res => {
        expect(res.body).toMatchObject(resBody);
        expect(res).toHaveProperty('statusCode', 201);
        const filePath = join(config.STORAGE_PHOTOS, res.body.avatar.fileName);

        const fileExists = await statAsync(filePath).catch(err => undefined);
        if(!fileExists) {
          expect(filePath).toBe('Ten plik nie został umieszczony w storage/photos :(');
        }
          
        const thumbPath = join(config.STORAGE_THUMBS, res.body.avatar.fileName);
        expect(statAsync(thumbPath)).resolves.toMatchObject(expect.any(Object));
      });
  });
});
