import express from "express";
import { rsvpHandler } from "../handlers/rsvpHandler.js";

const router = express.Router();

router.post("/", rsvpHandler);

export default router;
