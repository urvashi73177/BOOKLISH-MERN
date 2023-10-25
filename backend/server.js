import { PORT, mongoDbUrl } from "./config.js";
import express from "express";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

// const express = require("express")
const app = express();

//Using Middleware for parsing request body. JSON is a inbuilt middleware parser in express. It parses the resquest which is in json format
app.use(express.json());

//Middleware for handling CORS policy
//This option allows all prigins with default of cors
// app.use(cors())

//Alow custom origins-
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Accept"],
    optionsSuccessStatus: 200,
  })
);

app.get("/", (request, response) => {
  response.set("Content-Type", "text/html"); //To use html in  the response status of the app
  console.log("This is request zzzzzzzzzzzzzz ", request);
  return response.status(234).send("<h1>Welcome to the Mern stack<h1>");
});

app.use("/books", booksRoute);

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
