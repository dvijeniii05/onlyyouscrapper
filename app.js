const express = require("express");

const app = express();

const allProductsRoute = require("./routes/allProducts");
const singleProductRoute = require("./routes/singleProduct");

app.use("/allProducts", allProductsRoute);

app.use("/singleProduct", singleProductRoute);

app.get("/", (req, res) => {
  res.send("We Are on HOMEPAGE");
});

app.listen(3000, () => console.log("Listenning to PORT:3000"));
