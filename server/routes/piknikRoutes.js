import express from "express";
import {
  createPiknikHandler,
  getAllPikniksHandler,
  getSinglePiknikHandler,
  updatePiknikHandler,
  deletePiknikHandler,
  joinEventHandler,
} from "../handlers/mypiknikHandlers.js";

const router = express.Router();

router.post("/", createPiknikHandler);
router.get("/", getAllPikniksHandler);
router.get("/:id", getSinglePiknikHandler);
router.put("/:id", updatePiknikHandler);
router.delete("/:id", deletePiknikHandler);
router.post("/join", joinEventHandler); 

export default router;
