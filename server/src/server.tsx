import express, { Express, Request, Response } from "express";
import ReactDOMServer from "react-dom/server";
import path from "path";
import App from "../../client/src/App.js";

const app: Express = express();
const PORT: number = 3000;

const __dirname = path.dirname(new URL(import.meta.url).pathname);

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

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
