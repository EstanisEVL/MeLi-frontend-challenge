import { Request, Response } from "express";
import ReactDOMServer from "react-dom/server";
import App from "../../../client/src/App.js";
import SearchResults from "../../../client/src/SearchResults.js";
import ItemDetail from "../../../client/src/ItemDetail.js";

export const renderIndex = async (req: Request, res: Response) => {
  try {
    const appHtml = ReactDOMServer.renderToString(<App />);

    const html = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>MeLi - Frontend Challenge</title>
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet">
          <link rel="stylesheet" href="styles.bundle.css">
        </head>
        <body>
          <div id="root">${appHtml}</div>
          <script src="index.bundle.js"></script>
        </body>
      </html>
    `;

    return res.send(html);
  } catch (err) {
    console.error(err);

    return res.status(500).json({ message: `Server side error - ${err}` });
  }
};

export const renderItems = async (req: Request, res: Response) => {
  try {
    const appHtml = ReactDOMServer.renderToString(<SearchResults />);

    const html = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>MeLi - Frontend Challenge</title>
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet">
          <link rel="stylesheet" href="styles.bundle.css">
        </head>
        <body>
          <div id="root">${appHtml}</div>
          <script src="pages/search.bundle.js"></script>
        </body>
      </html>
    `;

    return res.send(html);
  } catch (err) {
    console.error(err);

    return res.status(500).json({ message: `Server side error - ${err}` });
  }
};

export const renderItemDetail = async (req: Request, res: Response) => {
  try {
    const appHtml = ReactDOMServer.renderToString(<ItemDetail />);

    const html = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>MeLi - Frontend Challenge</title>
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet">
          <link rel="stylesheet" href="/styles.bundle.css">
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
};
