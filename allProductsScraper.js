const puppeteer = require("puppeteer");

const shuffle = require("./durstenfeldShuffle");

async function AllProductsScrape(skinTypesArray) {
  console.log("ALL_PRODUCTS_SCRAPE CALLED", skinTypesArray);
  const totalScrapedData = [];

  async function fromOneUrl(skinType) {
    console.log(
      "FROM_ONE_URL CALLED",
      `https://www.boots.com/sitesearch?searchTerm=${skinType}`,
      skinType
    );
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(
        `https://www.boots.com/sitesearch?searchTerm=${skinType}`
      );

      const buttonSelector = "button#onetrust-accept-btn-handler";
      await page.waitForSelector(buttonSelector);
      await page.click(buttonSelector);

      const scrapedData = await page.evaluate(() => {
        const allData = document.querySelectorAll(
          "li.estore_product_container"
        );
        const data = Object.values(allData).map((x) => {
          const secondElement = x.querySelectorAll("div")[2];
          const thirdElement = x.querySelectorAll("div")[3];
          // const secondElementNested = secondElement.querySelectorAll("div")[2];

          const srcSelector = "div > div > a > img.product_img";
          const descSelector = "div > div > a";
          const ratingStarsSelector =
            "div.product_top_section > div.product_rating > span";
          const ratingVotesSelector =
            "div.product_top_section > div.product_rating > a";

          return {
            src: x.querySelector(srcSelector).getAttribute("src"),
            shortDesc: x.querySelector(descSelector).getAttribute("title"),
            productUrl: x.querySelector(descSelector)?.getAttribute("href"),
            ratingStars: x
              .querySelector(ratingStarsSelector)
              ?.getAttribute("class"),
            ratingVotes: x.querySelector(ratingVotesSelector)?.textContent,
          };
        });
        return data;
      });
      // console.log("ALL_PRODUCTS", scrapedData);
      await browser.close();
      totalScrapedData.push(scrapedData);
    } catch (e) {
      console.log(e);
    }
  }
  for (const element of skinTypesArray) {
    await fromOneUrl(element);
  }
  const scrapedDataArray = totalScrapedData[0];
  shuffle(scrapedDataArray);
  return totalScrapedData;
}

module.exports = AllProductsScrape;
