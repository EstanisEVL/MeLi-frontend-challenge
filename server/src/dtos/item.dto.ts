/*
{
  “author”:
    { “name”: String
      “lastname”: String
    },
  “item”:
    {
      "id": String,
      "title": String,
      "price": {
        "currency": String,
        "amount": Number,
        "decimals": Number,
      },
  “picture”: String,
  "condition": String,
  "free_shipping": Boolean,
  "sold_quantity", Number
  "description": String
  }
}
*/
import { Author, ItemDetail } from "../interfaces/interfaces.index";

export class ItemResultDto {
  constructor(
    author: Author,
    item: ItemDetail,
    picture: string,
    condition: string,
    free_shipping: boolean,
    sold_quantity: number,
    description: string
  ) {
    this.author = author;
    this.item = item;
    this.picture = picture;
    this.condition = condition;
    this.free_shipping = free_shipping;
    this.sold_quantity = sold_quantity;
    this.description = description;
  }

  author: Author;
  item: ItemDetail;
  picture: string;
  condition: string;
  free_shipping: boolean;
  sold_quantity: number;
  description: string;
}
