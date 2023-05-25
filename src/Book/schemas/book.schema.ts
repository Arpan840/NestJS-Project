import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Catogery } from "src/bookEnums/book.enum";

@Schema({timestamps:true})
export class Book{
    @Prop({required:true,unique:true})
    title:string
    @Prop({required:true})
    description:string
    @Prop({required:true})
    author:string
    @Prop({required:true})
    price:number
    @Prop({required:true})
    catagory:Catogery
}
export const BookSchema = SchemaFactory.createForClass(Book);