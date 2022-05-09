import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Contact } from './contact.entity';
@Controller('contact')
@ApiTags('Contacts')
export class ContactController {
  @Get('contact')
  async findAll(): Promise<Contact[]> {
    return [
      { id: 1, name: 'piotr', email: '1@mail.pl', message: 'test' },
      { id: 1, name: 'piotr', email: '1@mail.pl', message: 'test' },
    ];
  }

  @Get(':id')
  async findOne(@Param('id') id:string): Promise<Contact> {
    
    // TODO uzyc bazy danych do odczytu rekordu dla id

    return {
      id: parseInt(id, 10),
      email: 'test@mail.pl',
      name: '',
      message: '',
    }
  }


  create() {}
  update() {}
  remove() {}
}
