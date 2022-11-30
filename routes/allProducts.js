const express = require("express");
const router = express.Router();

const allProductsScrape = require("../allProductsScraper");

router.get("/", async (req, res) => {
  const allProducts = await allProductsScrape();
  // res.send(allProducts.slice(0, 9));
  res.send(200);
});

module.exports = router;
