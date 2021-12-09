import { Test, TestingModule } from '@nestjs/testing';
import { copyFile, stat, unlink } from 'fs/promises';
import { join } from 'path';
import { ConfigModule, ConfigService } from '../../config';
import { PhotosService } from './photos.service';

describe('PhotosService', () => {

  const fixtureFileName = 'test-photo.png';
  const fixtureFilePath = './test/fixtures/test-photo.png';
  let service: PhotosService;
  let config: ConfigService;

  beforeEach(async () => {

    const testConfigService = {
      STORAGE_PHOTOS: './storage/photos',
      STORAGE_THUMBS: './storage/assets/thumbs',
      STORAGE_TMP: './storage/tmp',
    } as ConfigService

    const module: TestingModule = await Test.createTestingModule({
      // imports: [ConfigModule],
      providers: [
        PhotosService,
        {
          provide: ConfigService,
          useValue: testConfigService
        }
      ],
    }).compile();

    service = module.get<PhotosService>(PhotosService);
    config = module.get(ConfigService);
  });

  afterEach(async () => {
    await unlink(join(config.STORAGE_THUMBS, fixtureFileName)).catch(e => e);
    await unlink(join(config.STORAGE_PHOTOS, fixtureFileName)).catch(e => e);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  it('should create photo thumbs', async () => {

    await copyFile(fixtureFilePath, join(config.STORAGE_PHOTOS, fixtureFileName));

    const thumbs = await service.createThumbs(fixtureFileName);

    expect(thumbs.small).toContain(fixtureFileName);

    await expect(stat(thumbs.small)).resolves.toBeDefined();
  });

  it('should create new photo', async () => {

    const tmpFile = join(config.STORAGE_PHOTOS, fixtureFileName);
    await copyFile(fixtureFilePath, tmpFile);

    const file = {
      originalname: fixtureFileName,
      path: tmpFile,
    } as Express.Multer.File;

    const photo = await service.create(file);
    
    const uploadedFile = join(config.STORAGE_PHOTOS, photo.filename);

    await expect(stat(uploadedFile)).resolves.toBeDefined();

    await unlink(uploadedFile);

    expect(photo.filename).toContain('.png');
  })
});
