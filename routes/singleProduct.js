const express = require("express");
const router = express.Router();

const singleProductScrape = require("../singleProductScrape");

// router.get("/", async (req, res) => {
//   res.send("SINGLE_PRODUCT");
// });

router.get("/:productUrl", async (req, res) => {
  console.log("POST_CALLED");
  const productUrl = req.params.productUrl;
  const fullDesc = await singleProductScrape(req.params.productUrl);
  // console.log(fullDesc);
  res.send({ fullDesc, productUrl });
});

module.exports = router;
