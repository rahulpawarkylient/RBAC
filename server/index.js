import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import Connection from "./db/Connection.js";
import authRouter from "./routes/authRouter.js";
import customerRouter from "./routes/customerRouter.js";

const app = express();

dotenv.config();

const port = process.env.PORT;

app.use(cors());

//mongodb connection using dotenv
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

Connection(USERNAME, PASSWORD);

//convert in json form
app.use(express.json({ limit: "5mb" }));

// Upload Image Static
app.use("/uploads", express.static("uploads"));

// auth Routes
app.use("/api/", authRouter);

// customer Routes
app.use("/api/customer", customerRouter);

// for testing only
app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.listen(port, () => {
  console.log(`Server listening on port http://localhost:${port}`);
});
