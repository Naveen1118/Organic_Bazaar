import { Category } from "./category";

export class Product {
    id!: number;
    name!: string;
    description!: string;
    price!: number;
    img!: string; // base64 encoded or image URL
    category!: Category;
    deleted!: boolean;
}
