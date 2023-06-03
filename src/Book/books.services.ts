import { Injectable, NotFoundException, Post, Query } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Book } from "./schemas/book.schema";
import * as mongoose from 'mongoose';
import { updateBookDto } from "./dtos/update.book";
import { Query as ExperssQuery } from 'express-serve-static-core'

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name)
    private bookModel: mongoose.Model<Book>,
  ) { }

  async findAll(query : ExperssQuery): Promise<Book[]> {
    const resPerPage=2
    const currentPage=Number(query.page) || 1
    const skip= resPerPage * (currentPage-1)

    const keyword= query.keyword ?{
        title:{
          $regex: query.keyword,
          $options:'i'
        }
    }:{}
    return this.bookModel.find({...keyword}).limit(resPerPage).skip(skip);
  }
  async create(book: Book): Promise<Book> {
    const createdBook = await this.bookModel.create(book);
    return createdBook

  }
  async findBookById(id: string): Promise<Book> {
    const book = this.bookModel.findById(id)
    if (!book) {
      throw new NotFoundException("Book not found")
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