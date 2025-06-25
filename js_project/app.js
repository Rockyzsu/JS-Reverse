require("dotenv").config();
const express = require("express");
const app = express();
var morgan = require("morgan");
const { getHexin } = require("./hexin-v1");

app.use(express.json());

morgan.token("timestamp", () => {
  return new Date().toISOString();
});

app.use(morgan(":timestamp :method :url :status :response-time ms"));

app.get("/ths/hexin", (req, res) => {
  try {
    let token = getHexin();
    return res.json({ hexin: token, sttus: 1 });
  } catch (err) {
    return res.json({ hexin: null, status: 0 });
  }
});

//500 程序错误的处理
app.use(function (err, req, res, next) {
  console.log(err.stack);
  res.status(500).send("500 error");
});

//404 处理
app.use(function (req, res) {
  res.status(404).send("404 page not found");
});
const port = process.env.port;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
