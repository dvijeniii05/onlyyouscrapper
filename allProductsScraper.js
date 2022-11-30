const puppeteer = require("puppeteer");

async function AllProductsScrape() {
  console.log("POST_SINGLE");
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://www.boots.com/sitesearch?searchTerm=oily%20skin");

    const buttonSelector = "button#onetrust-accept-btn-handler";
    await page.waitForSelector(buttonSelector);
    await page.click(buttonSelector);

    const scrapedData = await page.evaluate(() => {
      const allData = document.querySelectorAll("li.estore_product_container");
      const data = Object.values(allData).map((x) => {
        const srcSelector = "div > a > img.product_img";
        const descSelector = "div > a";
        const ratingSelector = "div:nth-child(2) > span";
        const firstElement = x.querySelectorAll("div")[1];
        const secondElement = x.querySelectorAll("div")[2];

        return {
          src: firstElement.querySelector(srcSelector).getAttribute("src"),
          shortDesc: firstElement
            .querySelector(descSelector)
            .getAttribute("title"),
          productUrl: firstElement
            .querySelector(descSelector)
            ?.getAttribute("href"),
          ratingStars: secondElement
            .querySelector(ratingSelector)
            .getAttribute("title"),
        };
      });
      return data;
    });
    console.log("ALL_PRODUCTS", scrapedData);
    await browser.close();
    return scrapedData;
  } catch (e) {
    console.log(e);
  }
}

module.exports = AllProductsScrape;
