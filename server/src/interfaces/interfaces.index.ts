export interface Author {
  name: string;
  lastname: string;
}

export interface Price {
  currency: string;
  amount: number;
  decimals: number;
}

export interface Item {
  id: string;
  title: string;
  price: Price;
  picture: string;
  condition: string;
  free_shipping: boolean;
}

export interface ItemDetail {
  id: string;
  title: string;
  price: Price;
}

export interface ItemResult {
  author: Author;
  item: ItemDetail;
  picture: string;
  condition: string;
  free_shipping: boolean;
  sold_quantity: number;
}

export interface Results {
  author: Author;
  categories: string[];
  items: Item[];
}
