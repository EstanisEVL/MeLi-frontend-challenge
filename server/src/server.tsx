import express, { Express, Request, Response } from "express";
import ReactDOMServer from "react-dom/server";
import App from "../../client/src/App";

const app: Express = express();
const PORT: number = 3000;

app.get("/", async (req: Request, res: Response) => {
  try {
    const html = ReactDOMServer.renderToString(<App />);

    return res.send(html);
  } catch (err) {
    console.error(err);

    return res.status(500).json({ message: `Server side error - ${err}` });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
