import { QuoteEntity } from '../entities';


export class FindQuotesResponseDto {
  pageIndex: number;
  pageSize: number;
  total: number;
  data: QuoteEntity[];
}
