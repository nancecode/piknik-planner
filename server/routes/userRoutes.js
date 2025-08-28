import express from "express";
import { updateUserHandler } from "../handlers/userHandlers.js";

const router = express.Router();

router.patch("/update-user", updateUserHandler);

export default router;
