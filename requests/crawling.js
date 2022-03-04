const {
  ALGUMON,
  SFF_EVENT,
  SFF_HOTDEAL,
  SFF_TRADE,
  COOLENJOY,
  QUASARZONE,
} = require("./target");
let cheerio = require("cheerio");

module.exports = function crawling(target, body) {
  switch (target) {
    case SFF_EVENT:
    case SFF_HOTDEAL:
    case SFF_TRADE: {
      let $ = cheerio.load(body);
      let newestInfo = $(".us-post").first();
      let name = newestInfo.find("td.gall_tit").children().first().text();
      console.log(name);
      let link =
        "https://gall.dcinside.com" +
        newestInfo.find("td.gall_tit").children().attr("href");
      // console.log(link);
      let owner = newestInfo
        .find("td.gall_writer")
        .children()
        .first()
        .attr("title");
      console.log(owner);
      return { name, link, owner };
    }
    case ALGUMON: {
      let $ = cheerio.load(body);
      let newestInfo = $("a.product-link").first();
      let name = newestInfo.attr("data-label");
      let link = "https://algumon.com" + newestInfo.attr("href");
      let price = $("small.product-price").first().text().trim();
      console.log(name);
      // console.log(link);
      console.log(price);
      return { name, link, price };
    }
    case COOLENJOY: {
      let $ = cheerio.load(body);
      let newestInfo = $("td.td_subject").children().first();
      let name = newestInfo.text().trimLeft().split("댓글")[0];
      let link = newestInfo.attr("href");
      console.log(name);
      return { name, link };
    }
    case QUASARZONE: {
      let $ = cheerio.load(body);
      let newestInfoName = $("p.tit").first();
      let newestInfoPrice = $("div.market-info-sub").first();
      let link = newestInfoName.find("a.subject-link").attr("href").split("/");
      link =
        "https://quasarzone.com/bbs/qb_saleinfo" + `/${link[3]}/${link[4]}`;
      // console.log(link);
      let name = newestInfoName.find("span.ellipsis-with-reply-cnt").text();
      console.log(name);
      let price = newestInfoPrice.find("span.text-orange").text();
      console.log(price);
      return { name, price, link };
    }
    default:
      break;
  }
};
