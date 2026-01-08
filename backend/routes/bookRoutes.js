import express from "express";
import { getBooks, addBook } from "../controllers/bookController.js";

const router = express.Router();

router.get("/", getBooks);
router.post("/", addBook); // ⭐ IMPORTANT LINE

export default router;
