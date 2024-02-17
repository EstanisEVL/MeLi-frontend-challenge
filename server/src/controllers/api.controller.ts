import { Request, Response } from "express";
import { apiService } from "../services/api.service.js";
import { ItemResultDto } from "../dtos/item.dto.js";
import { ItemResult } from "../interfaces/interfaces.index.js";

export const getItems = async (req: Request, res: Response) => {
  try {
    const query = req.query.q;
    const limit: number = 4;
    const url: string = `https://api.mercadolibre.com/sites/MLA/search?q=${query}&limit=${limit}`;

    const items = await apiService.getItems(url);

    if (!items)
      return res
        .status(404)
        .json({ message: "Error - Productos no encontrados." });

    return res.status(200).json(items);
  } catch (err) {
    console.error(err);

    return res.status(500).json({ message: `Server side error - ${err}` });
  }
};

// Corregir cómo se reciben los datos del servicio: propiedad amount no la lee correctamente el frontend.
export const getItemDetail = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const idUrl: string = `https://api.mercadolibre.com/items/${id}`;
    const descriptionUrl: string = `https://api.mercadolibre.com/items/${id}/description`;

    const itemData: ItemResult = await apiService.getItemData(idUrl);

    if (!itemData)
      return res
        .status(404)
        .json({ message: "Error - Product no encontrado." });

    const itemDescription = await apiService.getItemDescription(descriptionUrl);

    if (!itemDescription)
      return res
        .status(404)
        .json({ message: "Error - Descripción del producto no encontrada." });

    const searchResult = new ItemResultDto(itemData, itemDescription);

    return res.status(200).json(searchResult);
  } catch (err) {
    console.error(err);

    return res.status(500).json({ message: `Server side error - ${err}` });
  }
};
