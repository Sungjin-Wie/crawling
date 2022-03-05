let request = require("request");
require("dotenv").config();
const { CHAT_ADMIN, TELEGRAM, CHAT_SFAM } = process.env;
let telegramIDs = [CHAT_ADMIN, CHAT_SFAM];

function generateTelegramRequestMap(text, telegramIDArr = telegramIDs) {
  const options = {
    url: `https://api.telegram.org/bot${TELEGRAM}/sendMessage`,
    qs: {
      chat_id: "",
      text: text,
    },
  };
  let sendMessageArray = [];
  telegramIDArr.map((chatID) => {
    let newOption = copy(options);
    newOption.qs.chat_id = chatID;
    sendMessageArray.push(sendMessage(newOption));
  });
  return sendMessageArray;
}

function sendMessage(option) {
  return new Promise((resolve, reject) => {
    request(option, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        console.log("메시지 전송 완료.");
        resolve();
      } else {
        console.log(body);
        console.log(error);
        reject(error);
      }
    });
  });
}

const copy = (obj) => JSON.parse(JSON.stringify(obj));

const checkIfItsRecentlyAdded = (hotDealArray, newHotDeal) => {
  let isAddedAlready = false;
  let isMutated = false;
  hotDealArray.map((hotDeal) => {
    if (hotDeal.link == newHotDeal.link || hotDeal.name == newHotDeal.name) {
      isAddedAlready = true;
    }
  });
  if (!isAddedAlready) {
    isMutated = true;
    hotDealArray.push(newHotDeal);
    if (hotDealArray.length > 3) {
      hotDealArray.shift();
    }
  }
  return [hotDealArray, isMutated];
};

module.exports = {
  generateTelegramRequestMap,
  checkIfItsRecentlyAdded,
};
