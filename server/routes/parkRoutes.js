import express from "express";
import { getParksHandler } from "../handlers/parkHandlers.js";

const router = express.Router();

router.get("/", getParksHandler);

export default router;
