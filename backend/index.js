require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const connectDB = require("./configuration/connection");

const cors = require("cors");

const bookRouter = require("./router/book");
const userRouter = require("./router/user");

// allow access of the api
app.use(cors({ origin: process.env.FRONTEND }));

// to support incoming form data in json
app.use(express.json());

connectDB();

const path = require("path");
app.use("/public", express.static(path.join(__dirname, "./public")));
app.use(express.urlencoded({ extended: false }));

app.use("/users", userRouter);

app.get("/", (req, res) => {
    res.json({
        message: "This is home route",
    });
});

// managing errors
app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong" } = err;
    res.status(statusCode).json({
        message: message,
    });
});

// setting up http server at port
app.listen(port, () => {
    console.log(`There server is running at ${port}`);
});