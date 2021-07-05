import { Body, Controller, Get, HttpException, NotFoundException, Param, Post, Query} from '@nestjs/common';
import { QuoteEntity } from '../entities';
import { QuotesService } from '../services';

@Controller('quotes')
export class QuotesController {

  constructor(private quoteService: QuotesService) {}

  @Get()
  findQuotes(@Query() query: any = {}) {
    return this.quoteService.find(query.q);
  }

  @Get(':id')
  async getQuote(@Param('id') id) {
    id = parseInt(id, 10);
    const quote = await this.quoteService.get(id);
    if(!quote) {
      throw new NotFoundException(`Quote for id: ${id} not found`);
      // throw new HttpException("not found", 404)
    }
    return quote;
  }

  @Post()
  createQuote(@Body() data: QuoteEntity) {
    return this.quoteService.create(data);
  }

  updateQuote(id, data) {
    id = parseInt(id, 10);
    return this.quoteService.update(id, data);
  }

  deleteQuote(id) {
    id = parseInt(id, 10);
    return this.quoteService.delete(id);
  }
}
