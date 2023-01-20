const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));
const userRouter = require("./routes/userRoutes");

app.use("/api/v1/users", userRouter);

app.use("/ping", (req, res, next) => {
  res.send("Helo World !");
});


module.exports = app;
// http://localhost:3000/api/v1/blogs/62cfcd969c828fea45257607/upload
