import { Test, TestingModule } from '@nestjs/testing';
import { StorageService } from './storage.service';
<<<<<<< HEAD

describe('LoggerService', () => {
=======
import { STORAGE_FILE } from './storage.tokens';

describe('StorageService', () => {
>>>>>>> upstream/220509-nest
  let service: StorageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StorageService],
<<<<<<< HEAD
    }).compile();
=======
    })
    .overrideProvider(STORAGE_FILE)
    .useValue('./storage/test-data.json')
    .compile();
>>>>>>> upstream/220509-nest

    service = module.get<StorageService>(StorageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
