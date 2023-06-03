import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { BookService } from "./books.services";
import { Book } from "./schemas/book.schema";
import { updateBookDto } from "./dtos/update.book";
import { Query as ExperssQuery } from 'express-serve-static-core'


@Controller('book')
export class BookController {
  constructor(private bookService: BookService) {

  }
  @Get()
  async findAll(@Query() query: ExperssQuery): Promise<Book[]> {
    return this.bookService.findAll(query);
  }
  @Post('createBooks')
  async createBook(
    @Body()
    Book
  ): Promise<Book> {
    return this.bookService.create(Book);
  }
  @Get(':id')
  async findOneBook(
    @Param('id')
    id: string
  ) {
    return this.bookService.findBookById(id)
  }

  @Put(':id')
  async findBookAndUpdate(
    @Param('id') id: string,
    @Body() book: updateBookDto
  ): Promise<Book> {
    return await this.bookService.findByIdAndUpdate(id, book);
  }
  @Delete(':id')
  async findByIdandDelete(
    @Param('id') id: string
  ): Promise<Book> {
    return await this.bookService.findBookAndDelete(id)
  }

}
