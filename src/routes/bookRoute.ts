import express from "express";
import bookController from "../controllers/bookController";

const router = express.Router();

router.post("/books", bookController.createBook);
router.get("/books/:bookId", bookController.getBook);
router.get("/books", bookController.getAllBook);
router.patch("/books/:bookId", bookController.updateBook);
router.delete("/books/:bookId", bookController.deleteBook);

export = router;
