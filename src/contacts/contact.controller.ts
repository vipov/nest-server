import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
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
  UnprocessableEntityException,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoggerService } from '../logger/logger.service';
import { StorageService } from '../storage/storage.service';
import {
  CreateContactDto,
  ErrorResponse,
  GetContactsDto,
  SimplePayloadDto,
  SimpleRoleNames,
  UpdateContactDto,
  UpdateContactResponse,
} from './contact.dto';
import { Contact } from './contact.entity';
import { PerformenceInterceptor } from './performence.interceptor';
import { SimplePayload } from './simple-payload.decorator';
import { SimpleRole } from './simple-role.decorator';
import { SimpleGuard } from './simple.guard';

@Controller('contacts')
@ApiTags('Contacts')
@SimpleRole(SimpleRoleNames.ADMIN)
@UseInterceptors(PerformenceInterceptor)
export class ContactsController {
  constructor(private storage: StorageService, private logger: LoggerService) {
    // console.log(logger);
    // this.logger.warn('WITAJ W Contacts Controller')
  }

  @Get()
  async findAll(
    @Query(new ValidationPipe({ transform: true })) query: GetContactsDto,
  ): Promise<Contact[]> {
    // TODO pobrac rekordy i je zwrocic
    const contacts = await this.storage.findAll(Contact);
    return contacts.slice(
      (query.page - 1) * query.pageSize,
      query.page * query.pageSize,
    );
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: 404,
    type: ErrorResponse,
    description: 'Błąd gdy rekord dla danego id nie istnieje',
  })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Contact> {
    // TODO uzyc bazy danych do odczytu rekordu dla id
    const contact = await this.storage.findOne(Contact, id);
    // console.log(payload)
    // this.logger.warn(`Kontakt dla id ${id} nie istnieje`, '404 Not Found')

    if (!contact) {
      this.logger.warn(`Kontakt dla id ${id} nie istnieje`, '404 Not Found');
      throw new NotFoundException(`Kontakt dla id ${id} nie istnieje`);
    }
    return contact;
  }

  @Post()
  // jak ma tylko referencje, czyli samo ValidationPipe to tworzy domyslna instancje z klasy
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiResponse({
    status: 400,
    type: ErrorResponse,
    description: 'Id z tym rekordem jest juz zajety',
  })
  @ApiResponse({
    status: 500,
    type: ErrorResponse,
    description: 'Cos poszlo nie tak',
  })
  async create(@Body() data: CreateContactDto): Promise<Contact> {
    const existingEmail = await this.storage
      .findAll(Contact)
      // .then((contacts) => contacts.find(contact.email === data.email));
      .then((contacts) =>
        contacts.find((contact) => contact.email === data.email),
      );
    if (existingEmail) {
      throw new BadRequestException(`Email ${data.email} jest ddjuz zajety`);
    }
    const contact = await this.storage.create(Contact, data);
    if (!contact) {
      this.logger.warn(`Kontakt dla id  nie istnieje`, '404 Not Found');
      throw new InternalServerErrorException('Ups, cos nie tak');
    }
    return contact;
  }

  @Patch(':id')
  @ApiResponse({
    status: 404,
    type: ErrorResponse,
    description: 'Błąd gdy rekord dla danego id nie istnieje',
  })
  @UseGuards(SimpleGuard)
  @ApiBearerAuth()
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateContactDto,
  ): Promise<UpdateContactResponse> {
    const contact = await this.storage.update(Contact, id, data);
    if (!contact) {
      this.logger.warn(`Kontakt dla id ${id} nie istnieje`, '404 Not Found');
      throw new NotFoundException(`Kontakt dla id ${id} nie istnieje`);
    }
    return { contact };
  }

  @Delete(':id')
  @ApiResponse({
    status: 404,
    type: ErrorResponse,
    description: 'Błąd gdy rekord dla danego id nie istnieje',
  })
  @UseGuards(SimpleGuard)
  @ApiBearerAuth()
  @SimpleRole(SimpleRoleNames.ROOT)
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @SimplePayload() payload: SimplePayloadDto,
  ): Promise<number> {
    const contact = await this.storage.findOne(Contact, id);
    console.log(payload);
    this.logger.log(`User ${payload.name} usuwa contact o id: ${id}`);

    if (!contact) {
      this.logger.warn(`Kontakt dla id ${id}`, '404 Not Found');
      throw new NotFoundException(`Kontakt dla id ${id} nie istnieje`);
    }
    const c = await this.storage.remove(Contact, id);
    return c;
  }
}
function UserInterceptors(
  PerformenceInterceptor: typeof PerformenceInterceptor,
) {
  throw new Error('Function not implemented.');
}
