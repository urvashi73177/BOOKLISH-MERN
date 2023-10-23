import express from "express";
import {Books} from "../models/bookModels.js"

const router = express.Router();

//Route to create a new book
router.post("/", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: "Send all required fields: title, author, publisher",
      });
    }

    const newBooks = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
    };

    const book = await Books.create(newBooks);
    return response.status(200).send(book);
  } catch (err) {
    console.log(err.message);
    response.status(500).send({ message: err.message });
  }
});

//Route to get all the books from the database
router.get("/", async (request, response) => {
  try {
    // response.status(200).send("This is books page")
    const books = await Books.find({});
    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (err) {
    console.log(err.message);
    response.status(500).send({ message: err.message });
  }
});

//Whenver we make any http request we use async await so that our app doesnt get stuck or become unresponsive while it's waiting for database quesry to complete.

//Route to get one book from thte database by id.
router.get("/:id", async (request, response) => {
  try {
    // response.status(200).send("This is books page")
    const id = request.params.id;
    const books = await Books.findById(id);
    return response.status(200).json(books);
  } catch (err) {
    console.log(err.message);
    response.status(500).send({ message: err.message });
  }
});

//Route to update the books using http request-
router.put("/:id", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: "Send all required fileds: title, author, publishyear",
      });
    }

    const { id } = request.params;
    const result = await Books.findByIdAndUpdate(id, request.body, {
      new: true,
    });
    // console.log(result);
    if (!result) {
      return response.status(404).json({ message: "Book not found" });
    }

    return response.status(200).send({ message: "Book updated successfully" });
  } catch (err) {
    console.log(err.message);
    response.status(500).send({ message: err.message });
  }
});

//Route to delete the book using id
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const deleteBook = await Books.findByIdAndDelete(id);

    if (!deleteBook) {
      return response.status(404).send({ message: "Book not found" });
    }

    return response.status(200).send({ message: "Book deleted successfully" });
  } catch (err) {
    console.log(err.message);
  }
});

export default router;
