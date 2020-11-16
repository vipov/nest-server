import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '../config';
import { resolve } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        type: 'sqlite',
        database: config.DB_NAME,
        entities: [resolve(__dirname, '..') + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
      inject: [ConfigService],
      imports: [ConfigModule],
    }),
  ],
  exports: [TypeOrmModule],
})
export class DbModule {}
