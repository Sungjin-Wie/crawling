let request = require("request");
require("dotenv").config();
const { CHAT_SJ, CHAT_SFAM, TELEGRAM } = process.env;

let telegramIDs = [CHAT_SJ, CHAT_SFAM];

function generatePromiseArray(text, telegramIDArr = telegramIDs) {
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
  return new Promise((resolve) => {
    request(option, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        console.log("메시지 전송 완료.");
        resolve();
      } else {
        console.log(body);
        console.log(error);
      }
    });
  });
}

const copy = (obj) => JSON.parse(JSON.stringify(obj));

module.exports = {
  generatePromiseArray,
};
