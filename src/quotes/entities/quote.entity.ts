import { ApiProperty } from '@nestjs/swagger';

export class QuoteEntity {
  id: number;

  @ApiProperty({ description: 'Fajny cytat', example: 'Nest jest fajny!' })
  text: string;

  @ApiProperty({ description: 'Kto powiedział', example: 'Piotr' })
  author: string;
}
