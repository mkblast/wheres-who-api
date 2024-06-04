const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const mongoDB = process.env.MONGODB_URI;

async function main() {
  await mongoose.connect(mongoDB);
}

main().catch(e => console.log(e));

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const levelRouter = require("./routes/level");

app.use("/api/", levelRouter);

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500).json("Server Error");
});

app.listen(3000, () => console.log("server started at port 3000"));
