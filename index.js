let scheduler = require("node-schedule");
let crawlingRequest = require("./requests");
let target = require("./requests/target");
const { ALGUMON, SFF_EVENT, SFF_HOTDEAL, SFF_TRADE, COOLENJOY, QUASARZONE } =
  target;

var flag = 1;
const crawling = () => {
  switch (flag) {
    case 1:
      crawlingRequest(SFF_EVENT);
      flag++;
      break;
    case 2:
      crawlingRequest(SFF_HOTDEAL);
      flag++;
      break;
    case 3:
      crawlingRequest(SFF_TRADE);
      flag++;
      break;
    case 4:
      crawlingRequest(ALGUMON);
      flag = 1;
      break;
    default:
      break;
  }
};

scheduler.scheduleJob("*/3 * * * * *", crawling);
