import { ApiProperty } from "@nestjs/swagger";

export class FileUploadDto {

  @ApiProperty({type: 'string', format: 'binary'})
  file: any;

  description: string;
  
  title: string;
}