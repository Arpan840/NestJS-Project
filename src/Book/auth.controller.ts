import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { BookService } from "./auth.services";
import { Book } from "./schemas/book.schema";
import { get } from "http";
import { retry } from "rxjs";
import { updateBookDto } from "./dtos/update.book";

@Controller('book')
export class BookController {
  constructor(private bookService: BookService) {

  }
  @Post('findAllBooks')
  async findAll(): Promise<Book[]> {
    return this.bookService.findAll();
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
