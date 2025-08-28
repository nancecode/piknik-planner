import express from "express";
import { getEventsHandler, getEventByIdHandler } from "../handlers/eventHandlers.js";

const router = express.Router();

router.get("/", getEventsHandler);     
router.get("/:id", getEventByIdHandler);  

export default router;
