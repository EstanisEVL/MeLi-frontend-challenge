import express, { Express } from "express";
import path from "path";
import { fileURLToPath } from "url";

import viewRoutes from "./routes/view.routes.js";
import apiRoutes from "./routes/api.routes.js";

const app: Express = express();
const PORT: number = 3000;
const __dirname: string = fileURLToPath(new URL(".", import.meta.url));

app.use(express.json());
app.use(express.static(path.resolve(__dirname, "../../client")));

app.use("/", viewRoutes);
app.use("/api/items", apiRoutes);

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
