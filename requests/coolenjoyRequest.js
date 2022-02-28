let cheerio = require("cheerio");
let request = require("request");
let fs = require("fs");
require("dotenv").config();
let { generatePromiseArray } = require("../common");

function coolenjoyRequest() {
  let data = JSON.parse(fs.readFileSync("info.json", { encoding: "utf8" }));
  let { coolenjoy } = data;
  const URL = "https://coolenjoy.net/bbs/jirum";
  const options = {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36",
    },
  };
  return request(URL, options, (error, response, body) => {
    let $ = cheerio.load(body);
    let newestInfo = $("td.td_subject").children().first();
    let name = newestInfo.text().trimLeft().split("댓글")[0];
    let link = newestInfo.attr("href");
    console.log(name);
    // console.log(link);
    if (coolenjoy.link !== link) {
      coolenjoy.link = link;
      coolenjoy.name = name;
      data.coolenjoy = coolenjoy;
      let text = `
쿨엔조이 - 지름, 알뜰정보
이름: ${name}
${link}
`;

      Promise.all(generatePromiseArray(text)).then(() => {
        fs.writeFileSync("info.json", JSON.stringify(data, null, 2));
      });
    }
  });
}

module.exports = coolenjoyRequest;
