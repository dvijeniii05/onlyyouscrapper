const puppeteer = require("puppeteer");

async function SingleProductScrape(productUrl) {
  console.log("URL", productUrl);
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    page.goto(productUrl);

    const buttonSelector = "button#onetrust-accept-btn-handler";
    await page.waitForSelector(buttonSelector);
    await page.click(buttonSelector);

    const scrapedData = await page.evaluate(() => {
      const allData = document.querySelector("div#contentOmnipresent div");
      return allData.innerHTML;
    });
    console.log(scrapedData);
    return scrapedData;
  } catch (e) {
    console.log(e);
  }
}

module.exports = SingleProductScrape;
