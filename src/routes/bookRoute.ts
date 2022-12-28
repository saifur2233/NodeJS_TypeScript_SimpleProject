import express from "express";
import bookController from "../controllers/bookController";
import { Schemas, ValidateJoi } from "../middleware/validation";
const router = express.Router();

router.post(
  "/books",
  ValidateJoi(Schemas.book.create),
  bookController.createBook
);
router.get("/books/:bookId", bookController.getBook);
router.get("/books", bookController.getAllBook);
router.patch(
  "/books/:bookId",
  ValidateJoi(Schemas.book.update),
  bookController.updateBook
);
router.delete("/books/:bookId", bookController.deleteBook);

export = router;
