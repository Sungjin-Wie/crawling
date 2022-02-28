let cheerio = require("cheerio");
let request = require("request");
let fs = require("fs");
require("dotenv").config();
let { generatePromiseArray } = require("../common");

function quasarzoneRequest() {
  let data = JSON.parse(fs.readFileSync("info.json", { encoding: "utf8" }));
  let { quasarzone } = data;
  const URL = "https://quasarzone.com/bbs/qb_saleinfo";
  return request(URL, (error, response, body) => {
    let $ = cheerio.load(body);
    let newestInfoName = $("p.tit").first();
    let newestInfoPrice = $("div.market-info-sub").first();
    let link = newestInfoName.find("a.subject-link").attr("href").split("/");
    link = URL + `/${link[3]}/${link[4]}`;
    // console.log(link);
    let name = newestInfoName.find("span.ellipsis-with-reply-cnt").text();
    console.log(name);
    let price = newestInfoPrice.find("span.text-orange").text();
    console.log(price);
    if (quasarzone.link !== link) {
      quasarzone.link = link;
      quasarzone.name = name;
      quasarzone.price = price;
      data.quasarzone = quasarzone;
      let text = `
퀘이사존 - 지름/핫딜
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

module.exports = quasarzoneRequest;
