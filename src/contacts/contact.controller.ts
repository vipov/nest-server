import { BadRequestException, Body, Controller, Delete, Get, InternalServerErrorException, NotFoundException, Param, ParseIntPipe, Patch, Post, Query, UnprocessableEntityException, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoggerService } from '../logger/logger.service';
import { StorageService } from '../storage/storage.service';
import { CreateContactDto, ErrorResponse, GetContactsDto, UpdateContactDto, UpdateContactResponse } from './contact.dto';
import { Contact } from './contact.entity';

@Controller('contacts')
@ApiTags('Contacts')
export class ContactsController {

  constructor(
    private storage: StorageService,
    private logger: LoggerService,
  ) {
    console.log(logger);
    // this.logger.warn('WITAJ W Contacts Controller')
  }

  @Get()
  async findAll(@Query( new ValidationPipe({transform: true})) query: GetContactsDto): Promise<Contact[]> {

    const contacts = await this.storage.findAll(Contact);

    return contacts.slice((query.page-1) * query.pageSize, query.page * query.pageSize);
  }

  @Get(':id')
  @ApiResponse({status: 404, type: ErrorResponse, description: 'Błąd gdy rekord dla danego id nie istnieje'})
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Contact> {

    const contact = await this.storage.findOne(Contact, id);
    
    if(!contact) {
      this.logger.warn(`Kontakt dla id ${id}`, '404 Not Found');
      throw new NotFoundException(`Kontakt dla id ${id} nie istnieje`);
    }

    return contact;
  }

  @Post()
  @UsePipes(new ValidationPipe({transform: true}))
  @ApiResponse({status: 400, type: ErrorResponse, description: 'Błąd gdy email jest już zajęty'})
  @ApiResponse({status: 500, type: ErrorResponse, description: 'Błąd gdy nie wiemy co poszło nie tak'})
  async create(@Body() data: CreateContactDto): Promise<Contact>{

    const existingEmail = await this.storage.findAll(Contact).then(
      contacts => contacts.find(contact => contact.email === data.email)
    )

    if(existingEmail) {
      throw new BadRequestException(`Email ${data.email} jest już zajęty`);
    }

    const contact = await this.storage.create(Contact, data);

    if(!contact) {
      throw new InternalServerErrorException('Ups, coś poszło źle :(')
    }

    return contact;
  }

  @Patch(':id')
  @ApiResponse({status: 404, type: ErrorResponse, description: 'Błąd gdy rekord dla danego id nie istnieje'})
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateContactDto): Promise<UpdateContactResponse> {

    const contact = await this.storage.update(Contact, id, data);
    
    if(!contact) {
      this.logger.warn(`Kontakt dla id ${id}`, '404 Not Found');
      throw new NotFoundException(`Kontakt dla id ${id} nie istnieje`);
    }

    return { contact };
  }

  @Delete(':id')
  @ApiResponse({status: 404, type: ErrorResponse, description: 'Błąd gdy rekord dla danego id nie istnieje'})
  async remove(@Param('id', ParseIntPipe) id: number): Promise<number> {

    const contact = await this.storage.findOne(Contact, id);
    
    if(!contact) {
      this.logger.warn(`Kontakt dla id ${id}`, '404 Not Found');
      throw new NotFoundException(`Kontakt dla id ${id} nie istnieje`);
    }

    const c = await this.storage.remove(Contact, id);

    return c;
  }

}
