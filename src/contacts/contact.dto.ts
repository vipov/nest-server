import { ApiProperty } from '@nestjs/swagger';
import { Contact } from './contact.entity';

export enum SortDir {
  ASC = 'asc',
  DESC = 'desc',
}

export class GetContactsDto {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortDir?: SortDir;
}

export class CreateContactDto {
  @ApiProperty({
    description: 'Podaj imie',
    example: 'Przemek',
  })
  name: string;
  @ApiProperty({
    description: 'Podaj email',
    example: 'Przemek@przemek.pl',
  })
  email: string;
  @ApiProperty({
    description: 'W czym pomoc?',
    example: 'nice app',
  })
  message: string;
  
}

export class UpdateContactDto {
  name: string;
  message: string;
}

export class UpdateContactResponse {
  contact: Contact;
}
