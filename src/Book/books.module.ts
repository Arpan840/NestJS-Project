import { Module } from "@nestjs/common";
import { BookController } from "./books.controller";
import { BookService } from "./books.services";
import { MongooseModule } from "@nestjs/mongoose";
import { Book, BookSchema } from "./schemas/book.schema";

@Module({imports:[MongooseModule.forFeature([{name:Book.name, schema:BookSchema}])],
    controllers:[BookController],
    providers:[BookService]
})
export class AuthModule{
   


}