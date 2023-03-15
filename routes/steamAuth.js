const express = require("express");
const passport = require("passport-steam");
const router = express.Router();

router.get(
  "/auth",
  passport.authenticate("steam", { failureRedirect: "/" }),
  function (req, res) {
    res.redirect("/");
  }
);

router.get(
  "/auth/return",
  function (req, res, next) {
    req.url = req.originalUrl;
    next();
  },
  passport.authenticate("steam", { failureRedirect: "/" }),
  function (req, res) {
    res.redirect("/");
  }
);

module.exports = router;
