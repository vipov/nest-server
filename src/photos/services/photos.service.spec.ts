import { Test, TestingModule } from '@nestjs/testing';
import { copyFile, stat, unlink } from 'fs/promises';
import { join } from 'path';
import { ConfigModule, ConfigService } from '../../config';
import { PhotosService } from './photos.service';

describe('PhotosService', () => {
  let service: PhotosService;
  let config: ConfigService;
  const fixtureName = 'test.png';
  const fixturePath = `./test/fixtures/${fixtureName}`;
  let file: Express.Multer.File;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [
        PhotosService,
        // zostawione dla przykładu
        // {
        //   provide: ConfigService,
        //   useValue: {
        //     STORAGE_TMP: './storage/tmp',
        //     STORAGE_PHOTOS: './storage/photos',
        //     STORAGE_THUMBS: './storage/assets/thumbs',
        //   } as ConfigService,
        // },
      ],
    }).compile();

    service = module.get<PhotosService>(PhotosService);
    config = module.get<ConfigService>(ConfigService);
    file = {
      originalname: fixtureName,
      path: join(config.STORAGE_TMP, fixtureName),
    } as Express.Multer.File;

    await copyFile(fixturePath, join(config.STORAGE_TMP, fixtureName));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('PhotosService.create() should create photo', async () => {
    const photo = await service.create(file);

    const uploadedFile = join(config.STORAGE_PHOTOS, photo.filename);

    await expect(stat(uploadedFile)).resolves.toBeDefined();

    await unlink(uploadedFile);

    expect(photo.filename).toContain('.png');
  });

  it('PhotosService.createThumbs() should create thumbs', async () => {
    const uploadedFile = join(config.STORAGE_PHOTOS, fixtureName);

    await copyFile(fixturePath, uploadedFile);

    const thumbs = await service.createThumbs(fixtureName);

    await expect(stat(thumbs.small)).resolves.toBeDefined();

    await unlink(uploadedFile);
    await unlink(thumbs.small);

    expect(thumbs.small).toContain('.png');
  });
});
