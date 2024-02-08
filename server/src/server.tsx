import express, { Express, Request, Response } from "express";
import ReactDOMServer from "react-dom/server";
import path from "path";
import App from "../../client/src/App.js";
import SearchResults from "../../client/src/SearchResults.js";
import ItemDetail from "../../client/src/ItemDetail.js";
import { ResultsDto } from "./dtos/results.dto.js";
import { ItemResultDto } from "./dtos/item.dto.js";
import { Item } from "./interfaces/interfaces.index.js";

const app: Express = express();
const PORT: number = 3000;

const __dirname: string = path.dirname(new URL(import.meta.url).pathname);

app.use(express.json());
app.use(express.static(path.resolve(__dirname, "../../client")));

/* Views */
app.get("/", async (req: Request, res: Response) => {
  try {
    const appHtml = ReactDOMServer.renderToString(<App />);

    const html = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>MeLi - Frontend Challenge</title>
        </head>
        <body>
          <div id="root">${appHtml}</div>
          <script src="/index.bundle.js"></script>
        </body>
      </html>
    `;

    return res.send(html);
  } catch (err) {
    console.error(err);

    return res.status(500).json({ message: `Server side error - ${err}` });
  }
});

app.get("/items", async (req: Request, res: Response) => {
  try {
    const appHtml = ReactDOMServer.renderToString(<SearchResults />);

    const html = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>MeLi - Frontend Challenge</title>
        </head>
        <body>
          <div id="root">${appHtml}</div>
          <script src="/pages/search.bundle.js"></script>
        </body>
      </html>
    `;

    return res.send(html);
  } catch (err) {
    console.error(err);

    return res.status(500).json({ message: `Server side error - ${err}` });
  }
});

app.get("/items/:id", async (req: Request, res: Response) => {
  try {
    const appHtml = ReactDOMServer.renderToString(<ItemDetail />);

    const html = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>MeLi - Frontend Challenge</title>
        </head>
        <body>
          <div id="root">${appHtml}</div>
          <script src="/pages/item.bundle.js"></script>
        </body>
      </html>
    `;

    return res.send(html);
  } catch (err) {
    console.error(err);

    return res.status(500).json({ message: `Server side error - ${err}` });
  }
});

/* Items */
app.get("/api/items", async (req: Request, res: Response) => {
  try {
    const author = { name: "Estanislao", lastname: "Varela" };
    const query = req.query.q;
    const limit: number = 4;
    const url: string = `https://api.mercadolibre.com/sites/MLA/search?q=${query}&limit=${limit}`;
    const data = await fetch(url).then((res) => res.json());
    const categories = data.filters[0]?.values?.map((category: any) => {
      return category.name;
    });
    const items = data.results.map((item: any): Item => {
      return {
        id: item.id,
        title: item.title,
        price: item.price,
        picture: item.thumbnail,
        condition: item.condition,
        free_shipping: item.shipping.free_shipping,
      };
    });

    const searchResult = new ResultsDto(author, categories, items);

    return res.status(200).json(searchResult);
  } catch (err) {
    console.error(err);

    return res.status(500).json({ message: `Server side error - ${err}` });
  }
});

app.get("/api/items/:id", async (req: Request, res: Response) => {
  try {
    const author = { name: "Estanislao", lastname: "Varela" };
    const { id } = req.params;
    const idUrl: string = `https://api.mercadolibre.com/items/${id}`;
    const itemData = await fetch(idUrl).then((res) => res.json());

    const descriptionUrl: string = `https://api.mercadolibre.com/items/${id}/description`;
    const itemDescription = await fetch(descriptionUrl).then((res) =>
      res.json()
    );

    const item = {
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
    const { plain_text } = itemDescription;

    const searchResult = new ItemResultDto(
      author,
      item,
      thumbnail,
      condition,
      shipping,
      initial_quantity,
      plain_text
    );

    return res.status(200).json(searchResult);
  } catch (err) {
    console.error(err);

    return res.status(500).json({ message: `Server side error - ${err}` });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
