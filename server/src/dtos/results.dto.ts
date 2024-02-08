import { Author, Item } from "../interfaces/interfaces.index";

export class ResultsDto {
  constructor(author: Author, categories: string[], items: Item[]) {
    this.author = author;
    this.categories = categories;
    this.items = items;
  }

  author: Author;
  categories?: string[];
  items?: Item[];
}
