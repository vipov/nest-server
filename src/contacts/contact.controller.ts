import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Contact } from './contact.entity';
import {
  GetContactsDto,
  CreateContactDto,
  UpdateContactDto,
  UpdateContactResponse,
  ErrorResponse,
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
      console.log(logger);
      // this.logger.warn(' WITAJ W contacts controllser');

    }

  @Get()
  async findAll(
    @Query(new ValidationPipe({ transform: true })) query: GetContactsDto,
  ): Promise<Contact[]> {
    // TODO pobrac rekordy i je zwrocic
      const contacts = await this.storage.findAll(Contact);
      return contacts.slice((query.page-1) * query.pageSize, query.page * query.pageSize); 
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Contact> {
    // TODO uzyc bazy danych do odczytu rekordu dla id
    const contact = await this.storage.findOne(Contact, id);
    if(!contact) {
      this.logger.warn(`Kontakt dla id ${id} nie istnieje`, '404 Not Found')
      throw new NotFoundException(`Kontakt dla id ${id} nie istnieje`)
    }
    return contact;
  }

  @Post()
  // jak ma tylko referencje: ValidationPipe to tworzy domyslna instancje z klasy
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiResponse({ status: 400, type: ErrorResponse, description: 'Id z tym rekordem jest juz zajety'})
  @ApiResponse({ status: 500, type: ErrorResponse, description: 'Cos poszlo nie tak'})
  async create(@Body() data: CreateContactDto): Promise<Contact> {

    const existingEmail = await this.storage.findAll(Contact).then(contacts => contacts.find(contact.email ===data.email))
    if(existingEmail) {
      throw new BadRequestException(`Email ${data.email} jest juz zajety`)
    }
    const contact = await this.storage.create(Contact, data);
    if(!contact) {
      this.logger.warn(`Kontakt dla id ${id} nie istnieje`, '404 Not Found')
      throw new InternalServerErrorException('Ups, cos nie tak');
    }
    return contact;
  }

  @Patch(':id')
  @ApiResponse({ status: 404, type: ErrorResponse, description: 'Id z tym rekordem nie istnieje'})
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateContactDto,
  ): Promise<UpdateContactResponse> {


    const contact = await this.storage.update(Contact, id, data);
    if (!contact) {
      this.logger.warn(`Kontakt dla id ${id} nie istnieje`, '404 Not Found')
      throw new NotFoundException(`Kontakt dla id ${id} nie istnieje`)
    }
    return {contact};
  }

  @Delete(':id')
  @ApiResponse({ status: 404, type: ErrorResponse, description: 'Blad gdy rekord nie istenieje'})
  async remove(@Param('id', ParseIntPipe) id: number): Promise<number> {
    const contact = await this.storage.findOne(Contact, id);

    if (!contact) {
      throw new NotFoundException(`Kontakt dla id ${id} nie istnieje`)
    }
    const c = await this.storage.remove(Contact, id);
    return c;
  }
}
