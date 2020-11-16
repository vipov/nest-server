import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { CommentsController } from './controllers/comments.controller';

@Module({
  imports: [UserModule],
  controllers: [CommentsController]
})
export class CommentsModule {}
