let scheduler = require("node-schedule");
let cheerio = require("cheerio");
let request = require("request");

const QUASARZONE_URL = "https://quasarzone.com/bbs/qb_saleinfo";

let quasarzone = {
  link: "",
  name: "",
  price: "",
};
request(QUASARZONE_URL, (error, response, body) => {
  let $ = cheerio.load(body);
  let newestInfoName = $("p.tit").first();
  let newestInfoPrice = $("div.market-info-sub").first();
  let link = newestInfoName.find("a.subject-link").attr("href").split("/");
  link = QUASARZONE_URL + `/${link[3]}/${link[4]}`;
  console.log(link);
  let name = newestInfoName.find("span.ellipsis-with-reply-cnt").text();
  console.log(name);
  let price = newestInfoPrice.find("span.text-orange").text();
  console.log(price);
  if (quasarzone.link !== link) {
    quasarzone.link = link;
    quasarzone.name = name;
    quasarzone.price = price;
    // 카톡 메시지 전송
  }
});
