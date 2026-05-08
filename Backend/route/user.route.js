import express from "express";
import { signup, login, addReadBook, getUsersWithReadBooks } from "../controller/user.controller.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/read", addReadBook);
router.get("/admin/users", getUsersWithReadBooks);

export default router;