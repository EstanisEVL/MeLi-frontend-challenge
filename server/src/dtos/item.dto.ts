import { Author, ItemDetail, ItemResult } from "../interfaces/interfaces.index";

export class ItemResultDto {
  constructor(item: ItemResult, description: string) {
    this.author = item.author;
    this.item = item.item;
    this.picture = item.picture;
    this.condition = item.condition;
    this.free_shipping = item.free_shipping;
    this.sold_quantity = item.sold_quantity;
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
