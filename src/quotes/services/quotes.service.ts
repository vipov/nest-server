import { Injectable } from '@nestjs/common';
/* eslint-disable */
const quotesData = require('./quotes.json');

@Injectable()
export class QuotesService {
  private quotes = quotesData;

  /**
   * Total number of quotes
   * @returns
   */
  async total(): Promise<number> {
    return this.quotes.length;
  }
  /**
   * Find quote by searching string
   *
   * @param q
   * @param pageIndex
   * @param pageSize
   * @returns
   */
  async find(q?: string, pageIndex = 0, pageSize = 5) {
    let quotes = this.quotes;
    if (q) {
      const queryReg = new RegExp(q, 'i');
      const findFn = (row) =>
        row.text.search(queryReg) >= 0 || row.author.search(queryReg) >= 0;
      quotes = this.quotes.filter(findFn);
    }
    const data = quotes.slice(pageIndex * pageSize).slice(0, pageSize);

    return data;
  }

  /**
   * Get quote by id
   *
   * @param id
   * @returns
   */
  async get(id: number) {
    return this.quotes.find((q) => q.id === id);
  }

  /**
   * Create new quote
   *
   * @param data
   * @returns
   */
  async create(data) {
    const quote = {
      text: '',
      author: '',
      ...data,
      id: this.quotes.length + 1,
    };
    this.quotes.unshift(quote);
    return quote;
  }

  /**
   * Update quote by id
   *
   * @param id
   * @param data
   * @returns
   */
  async update(id: number, data) {
    for (let i = 0; i < this.quotes.length; i++) {
      const quote = this.quotes[i];
      if (quote.id === id) {
        this.quotes[i] = {
          ...quote,
          ...data,
          id
        };
        return this.quotes[i];
      }
    }
    return null;
  }

  /**
   * Delete the quote
   * @param id
   * @returns boolean
   */
  async delete(id: number): Promise<boolean> {
    this.quotes = this.quotes.filter((c) => c.id !== id);
    return true;
  }
}
