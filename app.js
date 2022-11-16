const express = require("express");
const { allProductsScrape } = require("./allProductsScraper");

const app = express();

app.get("/", async (req, res) => {
  const imgArr = await allProductsScrape;
  res.send(imgArr.slice(0, 6));
});

app.listen(3000, () => console.log("Listenning to PORT:3000"));
