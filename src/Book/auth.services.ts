import { Injectable, NotFoundException, Post } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Book } from "./schemas/book.schema";
import * as mongoose from 'mongoose';
import { create } from "domain";
import { NotFoundError } from "rxjs";
import { updateBookDto } from "./dtos/update.book";

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name)
    private bookModel: mongoose.Model<Book>,
  ) { }

  async findAll(): Promise<Book[]> {
    return this.bookModel.find().exec();
  }
  async create(book: Book): Promise<Book> {
    const createdBook = await this.bookModel.create(book);
    return createdBook

  }
  async findBookById(id: string): Promise<Book> {
    const book = this.bookModel.findById(id)
    if (!book) {
      throw new NotFoundException("Book niot found")
    }
    return book
  }
  async findByIdAndUpdate(id: string, book: updateBookDto): Promise<Book> {
    const updatedBook = await this.bookModel.findByIdAndUpdate(id, book, {
      new: true,
      runValidators: true
    });
    return updatedBook;
  }
  async findBookAndDelete(id: string): Promise<Book> {
    return await this.bookModel.findByIdAndDelete(id);


  }


}