import { ApiProperty } from '@nestjs/swagger';
import { Contact } from './contact.entity';
import { IsEnum, IsNumber, IsOptional, IsString, Max, Min, IsEmail, MinLength} from 'class-validator';
import { Transform } from 'class-transformer';
export enum SortDir {
  ASC = 'asc',
  DESC = 'desc',
}

export class GetContactsDto {
  @IsNumber()
  @IsOptional()
  @Min(1)
  @Transform((prop) => parseInt(prop.value, 10))
  page?: number = 1;
  @IsNumber()
  @IsOptional()
  @Max(10)
  @Transform((prop) => parseInt(prop.value, 10))
  pageSize?: number = 2;

  @IsString()
  @IsOptional()
  sortBy?: string  = 'email';

  @IsEnum(SortDir)
  @IsOptional()
  sortDir?: SortDir = SortDir.ASC;

  @Transform(( {value}) => new Date(value))
  createAt?: Date
}

export class CreateContactDto {

  @ApiProperty({
    description: 'Podaj imie',
    example: 'Przemek',
  })
  @IsString()
  @MinLength(5)
  name: string = 'Przemek';

  @ApiProperty({
    description: 'Podaj email',
    example: 'Przemek@przemek.pl',
  })
  @IsEmail()
  email: string = 'Przemek@przemek.pl';

  @ApiProperty({
    description: 'W czym pomoc?',
    example: 'nice app',
  })
  @MinLength(5)
  message: string = 'Default message';
}

export class UpdateContactDto {
  name: string;
  message: string;
}

export class UpdateContactResponse {
  contact: Contact;
}

export class ErrorResponse {
  "statusCode": number;
  "message":string;
  "error": string;
}