let request = require("request");
let fs = require("fs");
let {
  generateTelegramRequestMap,
  checkIfItsRecentlyAdded,
} = require("./common");
const url = require("./url");
const crawling = require("./crawling");
const generateText = require("./generateText");
const options = {
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36",
  },
};
require("dotenv").config();
function crawlingRequest(target) {
  let data = JSON.parse(fs.readFileSync("info.json", { encoding: "utf8" }));
  let cachedArr = data[target];
  return request(url[target], options, (error, response, body) => {
    let newestInfo = crawling(target, body);
    let [mutatedArr, isMutated] = checkIfItsRecentlyAdded(
      cachedArr,
      newestInfo
    );
    if (isMutated) {
      data[target] = mutatedArr;
      let text = generateText(target, newestInfo);
      Promise.all(generateTelegramRequestMap(text))
        .then(() => {
          fs.writeFile("info.json", JSON.stringify(data, null, 2), () => {
            console.log("finished.");
          });
        })
        .catch((e) =>
          generateTelegramRequestMap("에러 발생, 확인 요망", [
            process.env.CHAT_ADMIN,
          ])
        );
    }
  });
}

module.exports = crawlingRequest;
