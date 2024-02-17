import { Router } from "express";
import {
  renderIndex,
  renderItems,
  renderItemDetail,
} from "../controllers/view.controller.js";

const router = Router();

router.get("/", renderIndex);

router.get("/items", renderItems);

router.get("/items/:id", renderItemDetail);

export default router;
