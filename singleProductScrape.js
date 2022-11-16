const puppeteer = require("puppeteer");

async function SingleProductScrape() {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    page.goto("SOME_URL");
  } catch (e) {
    console.log(e);
  }
}
