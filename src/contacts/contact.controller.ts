import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Contact } from './contact.entity';
import {
  GetContactsDto,
  CreateContactDto,
  UpdateContactDto,
  UpdateContactResponse,
} from './contact.dto';
import { StorageService } from 'src/storage/storage.service';
import { LoggerService } from 'src/logger/logger.service';

@Controller('contacts')
@ApiTags('Contacts')
export class ContactController {
  constructor(
    private storage: StorageService,
    private logger: LoggerService,
    ) { 
      this.logger.warn(' WITAJ W contacts controllser');

    }

  @Get()
  async findAll(
    @Query(new ValidationPipe({ transform: true })) query: GetContactsDto,
  ): Promise<Contact[]> {
    // TODO pobrac rekordy i je zwrocic
    return [
      { id: 1, name: 'przemek', email: 'pp@myflow.pl', message: 'test' },
      { id: 2, name: 'przemek', email: 'pp@myflow.pl', message: 'test' },
      query as any,
    ];
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Contact> {
    // TODO uzyc bazy danych do odczytu rekordu dla id

    return {
      id,
      email: '',
      name: '',
      message: '',
    };
  }

  @Post()
  // jak ma tylko referencje: ValidationPipe to tworzy domyslna instancje z klasy
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() data: CreateContactDto): Promise<Contact> {

    const contact = await this.storage.create(Contact, data);
    if(!contact) {
      throw new InternalServerErrorException('Ups, cos nie tak');
    }
    return contact;
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateContactDto,
  ): Promise<UpdateContactResponse> {
    return {
      contact: {
        ...data,
        id: id,
        email: '',
      },
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<number> {
    return id;
  }
}
