import {
  Author,
  Item,
  ItemDetail,
  ItemResult,
} from "../interfaces/interfaces.index";
import { ResultsDto } from "../dtos/results.dto.js";

export const apiService = {
  getItems: async (url: string) => {
    try {
      const author = { name: "Estanislao", lastname: "Varela" };
      const data = await fetch(url).then((res) => res.json());
      const categories = data.filters[0]?.values?.map((category: any) => {
        return category.name;
      });

      const items: Item[] = data.results.map((item: any): Item => {
        return {
          id: item.id,
          title: item.title,
          price: item.price,
          picture: item.thumbnail,
          condition: item.condition,
          free_shipping: item.shipping.free_shipping,
        };
      });

      const dataDto = new ResultsDto(author, categories, items);
      return dataDto;
    } catch (err) {
      throw err;
    }
  },

  getItemData: async (idUrl: string): Promise<ItemResult> => {
    try {
      const author: Author = { name: "Estanislao", lastname: "Varela" };

      const itemData = await fetch(idUrl).then((res) => res.json());

      const item: ItemDetail = {
        id: itemData.id,
        title: itemData.title,
        price: {
          currency: itemData.currency_id,
          amount: Number(itemData.price),
          decimals: Number(((itemData.price % 1) * 100).toFixed(2)),
        },
      };

      const { thumbnail, condition, initial_quantity } = itemData;

      const shipping = itemData.shipping?.free_shipping;

      const data: ItemResult = {
        author,
        item,
        picture: thumbnail,
        condition,
        free_shipping: shipping,
        sold_quantity: initial_quantity,
      };

      return data;
    } catch (err) {
      throw err;
    }
  },

  getItemDescription: async (descriptionUrl: string) => {
    try {
      const itemDescription = await fetch(descriptionUrl).then((res) =>
        res.json()
      );

      const { plain_text } = itemDescription;

      const data = plain_text;

      return data;
    } catch (err) {
      throw err;
    }
  },
};
