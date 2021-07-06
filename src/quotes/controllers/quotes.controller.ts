import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';
import { FindQuotesDto, FindQuotesResponseDto } from '../dto';
import { QuoteEntity } from '../entities';
import { QuotesService } from '../services';

@Controller('quotes')
export class QuotesController {
  constructor(private quoteService: QuotesService) {}

  @Get()
  async findQuotes(
    @Query() query: FindQuotesDto,
  ): Promise<FindQuotesResponseDto> {
    return this.quoteService.find(query.q);
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: Number })
  async getQuote(@Param('id') id) {
    id = parseInt(id, 10);
    const quote = await this.quoteService.get(id);
    if (!quote) {
      throw new NotFoundException(`Quote for id: ${id} not found`);
      // throw new HttpException("not found", 404)
    }
    return quote;
  }

  @Post()
  createQuote(@Body() data: QuoteEntity) {
    return this.quoteService.create(data);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', type: Number })
  async updateQuote(
    @Param('id') id,
    @Body() data: QuoteEntity,
  ): Promise<QuoteEntity> {
    id = parseInt(id, 10);
    return this.quoteService.update(id, data);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: Number })
  deleteQuote(@Param('id') id) {
    id = parseInt(id, 10);
    return this.quoteService.delete(id);
  }
}
