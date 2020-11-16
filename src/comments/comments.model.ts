import { ApiProperty } from "@nestjs/swagger";

export class CommentModel {
  id?: number;

  @ApiProperty({
    example: 'Piotr',
    description: 'Imię i nazwisko komentującego'
  })
  name: string;
  
}
