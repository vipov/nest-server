import { Controller, Get, OnModuleInit, Optional, Render } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { ConfigService } from './config';
import { PhotosService } from './photos/services/photos.service';
import { StorageService } from './storage/storage.service';
import { User } from './users/entities/user.entity';
import { UsersService } from './users/services/users.service';

export class Photo {
  id: number;
  filename: string;
}

@Controller()
@ApiTags('App')
export class AppController implements OnModuleInit {
 
  constructor(
    private config: ConfigService,
    private readonly appService: AppService, 
    @Optional() private usersService: UsersService,
    private photosService: PhotosService,
    private storage: StorageService,
  ) {
    
  }
  async onModuleInit() {
    console.log('init controller');
    // const storage = this.storage;
  
    // await storage.create(User, {name: 'Piotr'})
    // await storage.create(User, {name: 'Pawel'})
    // await storage.create(Photo, {filename: '/test/phot.png'})
    // await storage.create(Photo, {filename: '/test/avatar.png'})
    // console.log('STORAGE DATA', await storage.data);
    // console.log('STORAGE ALL', await storage.findAll(Photo));
    // console.log('STORAGE ONE', await storage.findOne(Photo, 1));
    // console.log('STORAGE ONE', await storage.update(Photo, 1, {filename: 'zmiana'}));
    // console.log('STORAGE ONE', await storage.remove(Photo, 2));
    // console.log('STORAGE DATA', await storage.data);

  }

  @Get()
  @Render('photos/index')
  async getHello() {
    const photos = await this.photosService.getPhotos();

    return { photos }
  }

  @Get('chat')
  @Render('chat')
  chat() {}
}
