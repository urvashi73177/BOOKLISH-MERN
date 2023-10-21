import { PORT, mongoDbUrl } from "./config.js";
import { Books } from "./models/bookModels.js";
import express from "express";
import mongoose from "mongoose";

// const express = require("express")
const app = express();

//Using Middleware for parsing request body. JSON is a inbuilt middleware parser in express. It parses the resquest which is in json format
app.use(express.json());

app.get("/", (request, response) => {
  response.set("Content-Type", "text/html"); //To use html in  the response status of the app
  console.log("This is request zzzzzzzzzzzzzz ", request);
  return response.status(234).send("<h1>Welcome to the Mern stack<h1>");
});

app.post("/books", async (request, response) => {
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

app.get("/books", async (request, response) => {
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

//Route to get the books from thte database by id.
app.get("/books/:id", async (request, response) => {
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

//Update the books using http request-

app.put("/books/:id", async (request, response) => {
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

//Delete the book using id

app.delete("/books/:id", async (request, response) => {
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

mongoose
  .connect(mongoDbUrl)
  .then(() => {
    console.log(`App is connected to database`);
    app.listen(PORT, () => {
      console.log(`App is listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
