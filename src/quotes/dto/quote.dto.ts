import { QuoteEntity } from '../entities';

export class FindQuotesDto {
  q?: string;
  pageIndex?: number;
  pageSize?: number;
}

export class FindQuotesResponseDto {
  pageIndex: number;
  pageSize: number;
  total: number;
  data: QuoteEntity[];
}
