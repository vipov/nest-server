import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Contact } from './contact.entity';
import {
  GetContactsDto,
  CreateContactDto,
  UpdateContactDto,
  UpdateContactResponse,
} from './contact.dto';

@Controller('contacts')
@ApiTags('Contacts')
export class ContactController {
  @Get()
  async findAll(@Query() query: GetContactsDto): Promise<Contact[]> {
    // TODO pobrac rekordy i je zwrocic
    return [
      { id: 1, name: 'przemek', email: 'pp@myflow.pl', message: 'test' },
      { id: 2, name: 'przemek', email: 'pp@myflow.pl', message: 'test' },
      query as any,
    ];
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Contact> {
    // TODO uzyc bazy danych do odczytu rekordu dla id

    return {
      id: parseInt(id, 10),
      email: '',
      name: '',
      message: '',
    };
  }

  @Post()
  async create(@Body() data: CreateContactDto): Promise<Contact> {
    return {
      email: '',
      message: 'test new one',
      name: '',
      ...data,
      id: 1,
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: UpdateContactDto,
  ): Promise<UpdateContactResponse> {
    return {
      contact: {
        ...data,
        id: parseInt(id, 10),
        email: '',
      },
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<number> {
    return parseInt(id, 10);
  }
}
