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
const query = require("../db/mysql");
const params = (...params) => [...params];
const q = require("../db/query");

function crawlingRequest(target) {
  query(q.select.allWithTargetID, params(target)).then((value) => {
    let dbArr = value[0];
    request(url[target], options, (error, response, body) => {
      let newestInfo = crawling(target, body);
      if (newestInfo.name == "" || newestInfo.link == "") {
        return;
      }
      let newestData = {
        targetId: target,
        title: newestInfo.name,
        link: newestInfo.link,
        nickName: newestInfo.owner || "",
        price: newestInfo.price || "",
      };
      let isMutated = true;
      for (item in dbArr) {
        if (dbArr[item]?.link == newestData.link) {
          isMutated = false;
          break;
        }
      }
      if (isMutated) {
        let text = generateText(target, newestInfo);
        let promiseArray = generateTelegramRequestMap(text);
        promiseArray.push(
          query(
            q.insert.newItem,
            params(
              newestData.targetId,
              newestData.title,
              newestData.link,
              newestData.nickName,
              newestData.price
            )
          )
        );
        if (dbArr.length >= 3)
          promiseArray.push(query(q.delete.oldItem, params(dbArr[0].link)));
        Promise.all(promiseArray).then(() => {
          console.log(`finished`);
        });
      }
    });
  });
}

module.exports = crawlingRequest;
