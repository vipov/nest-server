import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Contact } from './contact.entity';

@Controller('contacts')
@ApiTags('Contacts')
export class ContactController {

  @Get()
  async findAll(): Promise<Contact[]> {

    // todo pobrac rekordy i je zwrocic
    return [
      {id: 1, name: 'piotr', email: 'pio@myflow.pl', message: 'test'},
      {id: 2, name: 'piotr', email: 'pio@myflow.pl', message: 'test'},
    ]
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Contact> {

    //TODO uzyc bazy danych do odczytu rekordu dla id
    
    return {
      id: parseInt(id, 10),
      email: '',
      name: '',
      message: '',
    }
  }

  create() {}

  update() {}

  remove() {}
}
