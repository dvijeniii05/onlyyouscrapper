const express = require("express");
const router = express.Router();

const allProductsScrape = require("../allProductsScraper");

router.get("/:skinTypes", async (req, res) => {
  const parsedArray = JSON.parse(req.params.skinTypes);
  console.log("Types", parsedArray);
  const allProducts = await allProductsScrape(parsedArray);
  console.log("RESPONSE", allProducts[0].slice(0, 5));
  res.send(allProducts[0]);
  // res.send(200);
});

module.exports = router;
