import express, { Express, Request, Response } from "express";
import ReactDOMServer from "react-dom/server";
import path from "path";
import App from "../../client/src/App.js";
import { ResultsDto } from "./dtos/results.dto.js";

const app: Express = express();
const PORT: number = 3000;

const __dirname: string = path.dirname(new URL(import.meta.url).pathname);

app.use(express.json());
app.use(express.static(path.resolve(__dirname, "../../client")));

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
          <script src="/bundle.js"></script>
        </body>
      </html>
    `;

    return res.send(html);
  } catch (err) {
    console.error(err);

    return res.status(500).json({ message: `Server side error - ${err}` });
  }
});

app.get("/api/items", async (req: Request, res: Response) => {
  try {
    const author = { name: "Estanislao", lastname: "Varela" };
    const query = req.query.q;
    const limit: number = 4;
    const queryUrl: string = `https://api.mercadolibre.com/sites/MLA/search?q=${query}&limit=${limit}`;
    const data = await fetch(queryUrl).then((res) => res.json());
    const categories = data.filters[0].values.map((category: any) => {
      return category.name;
    });
    const items = data.results.map((item: any) => {
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

// /api/items/​​:id
app.get("/api/items/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    return res.send(id);
  } catch (err) {
    console.error(err);

    return res.status(500).json({ message: `Server side error - ${err}` });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});

/*
SEGUIR ACÁ: 
La implementación de estos nuevos endpoints no debería afectar la funcionalidad de tu aplicación de server-side rendering (SSR) existente si se maneja adecuadamente. Aquí hay algunas consideraciones para asegurarte de que no haya conflictos:

Separación de responsabilidades: Mantén la lógica de los endpoints API y el manejo de las solicitudes del cliente separadas. Los endpoints API deben servir exclusivamente datos JSON y no deben interferir con la lógica de renderizado del lado del servidor de tu aplicación existente.

Rutas distintas: Asegúrate de que las rutas para los endpoints API sean distintas de las rutas utilizadas para el SSR. Por ejemplo, podrías definir tus rutas API bajo /api y tus rutas de SSR bajo /.

Gestión de rutas en el servidor: En tu servidor Express, define primero las rutas de API y luego las rutas de SSR. Esto garantizará que las solicitudes de API se manejen antes de que las solicitudes de SSR se envíen al cliente.

Configuración de webpack: Si estás utilizando webpack para compilar tu aplicación de React, asegúrate de no incluir los módulos del servidor en el bundle que se envía al cliente. Esto puede hacerse utilizando configuraciones de webpack específicas para el servidor y el cliente.

Si sigues estas prácticas y mantienes las responsabilidades claramente separadas entre tu API y tu SSR, deberías poder agregar nuevas funcionalidades a tu aplicación sin afectar el funcionamiento existente. Siempre es recomendable hacer pruebas exhaustivas después de realizar cambios importantes para detectar posibles problemas.

// Endpoint para consultar detalles de un producto por id
app.get('/api/items/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const itemResponse = await axios.get(`https://api.mercadolibre.com/items/${id}`);
    const descriptionResponse = await axios.get(`https://api.mercadolibre.com/items/${id}/description`);
    const itemData = itemResponse.data;
    const descriptionData = descriptionResponse.data;
    const item = {
      id: itemData.id,
      title: itemData.title,
      price: {
        currency: itemData.currency_id,
        amount: Math.floor(itemData.price),
        decimals: Math.floor((itemData.price - Math.floor(itemData.price)) * 100)
      },
      picture: itemData.pictures[0].url,
      condition: itemData.condition,
      free_shipping: itemData.shipping.free_shipping,
      sold_quantity: itemData.sold_quantity,
      description: descriptionData.plain_text
    };
    const author = {
      name: 'TuNombre',
      lastname: 'TuApellido'
    };
    res.json({ author, item });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server side error' });
  }
});
*/
