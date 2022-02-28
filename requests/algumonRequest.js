let cheerio = require("cheerio");
let request = require("request");
let fs = require("fs");
require("dotenv").config();
let { generatePromiseArray } = require("../common");

function algumonRequest() {
  let data = JSON.parse(fs.readFileSync("info.json", { encoding: "utf8" }));
  let { algumon } = data;
  const URL = "https://algumon.com";
  return request(URL, (error, response, body) => {
    let $ = cheerio.load(body);
    let newestInfo = $("a.product-link").first();
    let name = newestInfo.attr("data-label");
    let link = URL + newestInfo.attr("href");
    let price = $("small.product-price").first().text().trim();
    console.log(name);
    // console.log(link);
    console.log(price);

    if (algumon.link !== link) {
      algumon.link = link;
      algumon.name = name;
      algumon.price = price;
      data.algumon = algumon;
      let text = `
알구몬 - 핫딜
이름: ${name}
가격: ${price}
${link}
`;

      Promise.all(generatePromiseArray(text)).then(() => {
        fs.writeFileSync("info.json", JSON.stringify(data, null, 2));
      });
    }
  });
}

module.exports = algumonRequest;
