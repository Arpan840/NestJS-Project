import {  Injectable, Post } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Book } from "./schemas/book.schema";
import * as mongoose from 'mongoose';
import { create } from "domain";

@Injectable()
export class BookService{
    constructor(
        @InjectModel(Book.name)
        private bookModel: mongoose.Model<Book>,
      ) {}
     
      async findAll(): Promise<Book[]> {
        return this.bookModel.find().exec();
      }
         async create(book:Book): Promise<Book> {
            const createdBook = await this.bookModel.create(book);
            return createdBook
            
        }
}