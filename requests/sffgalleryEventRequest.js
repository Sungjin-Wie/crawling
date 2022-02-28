let cheerio = require("cheerio");
let request = require("request");
let fs = require("fs");
require("dotenv").config();
let { generatePromiseArray } = require("../common");

function sffgalleryEventRequest() {
  let data = JSON.parse(fs.readFileSync("info.json", { encoding: "utf8" }));
  let { sffGalEvent } = data;
  const URL =
    "https://gall.dcinside.com/mgallery/board/lists/?id=sff&sort_type=N&search_head=50&page=1";
  return request(URL, (error, response, body) => {
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
    if (sffGalEvent.link !== link) {
      sffGalEvent.link = link;
      sffGalEvent.name = name;
      sffGalEvent.owner = owner;
      data.sffGalEvent = sffGalEvent;
      let text = `
SFF 갤러리 - 이벤트 탭
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

module.exports = sffgalleryEventRequest;
