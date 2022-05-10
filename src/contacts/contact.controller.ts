import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from '../app.service';
import { LoggerService } from '../logger/logger.service';
import { StorageService } from '../storage/storage.service';
import { CreateContactDto, GetContactsDto, UpdateContactDto, UpdateContactResponse } from './contact.dto';
import { Contact } from './contact.entity';

@Controller('contacts')
@ApiTags('Contacts')
export class ContactsController {

  constructor(
    private storage: StorageService,
    private logger: LoggerService,
  ) {
    this.logger.warn('WITAJ W Contacts Controller')
  }

  @Get()
  async findAll(@Query( new ValidationPipe({transform: true})) query: GetContactsDto): Promise<Contact[]> {

    // todo pobrac rekordy i je zwrocic
    return [
      {id: 1, name: 'piotr', email: 'pio@myflow.pl', message: 'test'},
      {id: 2, name: 'piotr', email: 'pio@myflow.pl', message: 'test'},
      query as any,
    ]
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Contact> {

    //TODO uzyc bazy danych do odczytu rekordu dla id

    return {
      id,
      email: '',
      name: '',
      message: '',
    }
  }

  @Post()
  @UsePipes(new ValidationPipe({transform: true}))
  async create(@Body() data: CreateContactDto): Promise<Contact>{

    return {
      email: '',
      message: 'test new one',
      name: '',
      ...data,
      id: 1,
    }
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateContactDto): Promise<UpdateContactResponse> {

    return {
      contact: {
        ...data,
        id: id,
        email: ''
      }
    }
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<number> {

    return id;
  }

}
