let cheerio = require("cheerio");
let request = require("request");
let fs = require("fs");
require("dotenv").config();
let { generatePromiseArray } = require("../common");

function sffgalleryHotDealRequest() {
  let data = JSON.parse(fs.readFileSync("info.json", { encoding: "utf8" }));
  let { sffGalHotDeal } = data;
  const URL =
    "https://gall.dcinside.com/mgallery/board/lists/?id=sff&sort_type=N&search_head=100&page=1";
  return request(URL, (error, response, body) => {
    let $ = cheerio.load(body);
    let newestInfo = $(".us-post").first();
    let name = newestInfo.find("td.gall_tit").children().first().text();
    console.log(name);
    let owner = newestInfo
      .find("td.gall_writer")
      .children()
      .first()
      .attr("title");
    console.log(owner);
    let link =
      "https://gall.dcinside.com" +
      newestInfo.find("td.gall_tit").children().attr("href");
    // console.log(link);
    if (sffGalHotDeal.link !== link) {
      sffGalHotDeal.link = link;
      sffGalHotDeal.name = name;
      sffGalHotDeal.owner = owner;
      data.sffGalHotDeal = sffGalHotDeal;
      let text = `
SFF 갤러리 - 핫딜 탭
이름: ${name}
닉네임: ${owner}
${link}
`;
      Promise.all(generatePromiseArray(text)).then(() => {
        fs.writeFileSync("info.json", JSON.stringify(data, null, 2));
      });
    }
  });
}

module.exports = sffgalleryHotDealRequest;
