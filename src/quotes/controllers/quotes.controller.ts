import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { QuotesService } from '../services';

@Controller('quotes')
export class QuotesController {
  constructor(private quoteService: QuotesService) {}

  @Get()
  findQuotes(@Query() query) {
    return this.quoteService.find(query.q);
  }

  @Get(':id')
  getQuote(@Param('id') id) {
    id = parseInt(id, 10);
    return this.quoteService.get(id);
  }

  @Post()
  createQuote(@Body() data) {
    return this.quoteService.create(data);
  }

  @Patch(':id')
  updateQuote(@Param('id') id, @Body() data) {
    id = parseInt(id, 10);
    return this.quoteService.update(id, data);
  }

  @Delete(':id')
  deleteQuote(@Param('id') id) {
    id = parseInt(id, 10);
    return this.quoteService.delete(id);
  }
}
