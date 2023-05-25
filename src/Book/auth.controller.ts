import { Body, Controller, Post } from "@nestjs/common";
import { BookService } from "./auth.services";
import { Book } from "./schemas/book.schema";

@Controller('book')
export class BookController{
   constructor( private bookService:BookService)
   {

   }
 @Post('findAllBooks')
 async findAll(): Promise<Book[]> {
    return this.bookService.findAll();
}
 @Post('createBooks')
 async createBook(
    @Body()
    Book
 ):Promise<Book>
{
    return this.bookService.create(Book);
}
}
