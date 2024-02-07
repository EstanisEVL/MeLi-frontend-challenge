interface Author {
  name: string;
  lastname: string;
}

interface Price {
  currency: string;
  amount: number;
  decimals: number;
}

interface Item {
  id: string;
  title: string;
  price: Price;
  picture: string;
  condition: string;
  free_shipping: boolean;
}

interface Results {
  author: Author;
  categories: string[];
  items: Item[];
}

export class ResultsDto {
  constructor(author: Author, categories: string[], items: Item[]) {
    this.author = author;
    this.categories = categories;
    this.items = items;
  }

  author: Author;
  categories: string[];
  items: Item[];
}
/* 
  {
    “author”: 
      { “name”: String
        “lastname”: String
      },
    categories: [String, String, String, ...],
    items: [
      {
        "id": String,
        "title": String,
        "price": 
          { "currency": String,
            "amount": Number,
            "decimals": Number
          },
        “picture”: String,
        "condition": String,
        "free_shipping": Boolean
      }, {...}, {...}, {...}
    ]
  }
*/
