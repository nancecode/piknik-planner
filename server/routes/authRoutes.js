import express from "express";
import {
  signupHandler,
  loginHandler,
  deleteUserHandler, updateUserHandler,
} from "../handlers/authHandlers.js";
import {verifyJWTAuth} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/signup", signupHandler);
router.post("/login", loginHandler);
router.patch("/update-user", verifyJWTAuth, updateUserHandler)
router.delete("/delete-user", verifyJWTAuth, deleteUserHandler);

export default router;
