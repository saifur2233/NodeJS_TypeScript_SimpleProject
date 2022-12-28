import express from "express";
import authorController from "../controllers/authorController";

const router = express.Router();

router.post("/authors", authorController.createAuthor);
router.get("/authors/:authorId", authorController.getAuthor);
router.get("/authors", authorController.getAllAuthors);
router.patch("/authors/:authorId", authorController.updateAuthor);
router.delete("/authors/:authorId", authorController.deleteAuthor);

export = router;
