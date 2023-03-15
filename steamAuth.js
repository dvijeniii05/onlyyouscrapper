const express = require("express");
const SteamAuth = require("node-steam-openid");

const steam = new SteamAuth({
  realm: "http://localhost:3000", // Site name displayed to users on logon
  returnUrl: "http://localhost:3000/auth/steam/authenticate", // Your return route
  apiKey: "D8B16689041256E8528ED5CFD72E1BFC", // Steam API key
});

const app = express();
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.get("/steamid", async (req, res) => {
  console.log("REQ", req.query.id);
  res.render("home");
});

app.get("/auth/steam", async (req, res) => {
  const redirectUrl = await steam.getRedirectUrl();
  console.log("First get hit");
  return res.redirect(redirectUrl);
});

app.get("/auth/steam/authenticate", async (req, res) => {
  try {
    const user = await steam.authenticate(req);
    console.log("USER", user);
    const string = encodeURIComponent(user.steamid);
    return res.redirect("/steamid/?id=" + string);
    //...do something with the data
  } catch (error) {
    console.error(error);
  }
});

app.listen(3000, () => console.log("Listenning to PORT:3000"));
