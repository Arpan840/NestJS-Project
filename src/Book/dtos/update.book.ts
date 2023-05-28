import { Catogery } from "src/bookEnums/book.enum";

export class updateBookDto{
    readonly title:string;
    readonly description:string;
    readonly  author:string;
    readonly price:number;
    readonly catagory:Catogery;
}