const puppeteer = require("puppeteer");

async function AllProductsScrape() {
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
        const srcSelector = "div > div > a > img.product_img";
        const descSelector = "div > div > a";
        return {
          src: x.querySelector(srcSelector).getAttribute("src"),
          desc: x.querySelector(descSelector).getAttribute("title"),
          productUrl: x.querySelector(descSelector)?.getAttribute("href"),
        };
      });
      return data;
    });
    // console.log(typeof scrapedData, scrapedData);
    await browser.close();
    return scrapedData;
  } catch (e) {
    console.log(e);
  }
}

exports.allProductsScrape = AllProductsScrape();
