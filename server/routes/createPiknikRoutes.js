import express from "express";
import {
  signupHandler,
  loginHandler,
  deleteUserHandler,
} from "../handlers/authHandlers.js";

const router = express.Router();

router.post("/signup", signupHandler);
router.post("/login", loginHandler);
router.delete("/delete-user", deleteUserHandler);

export default router;
