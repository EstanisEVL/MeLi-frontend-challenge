import { Router } from "express";
import { getItems, getItemDetail } from "../controllers/api.controller.js";

const router = Router();

router.get("/", getItems);

router.get("/:id", getItemDetail);

export default router;
