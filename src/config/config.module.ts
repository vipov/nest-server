import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';

@Module({
<<<<<<< HEAD
providers: [ConfigService],
exports: [ConfigService]

=======
  providers: [ConfigService],
  exports: [ConfigService],
>>>>>>> upstream/220509-nest
})
export class ConfigModule {}
