let scheduler = require("node-schedule");
let crawlingRequest = require("./requests");
const fs = require("fs");
let target = require("./requests/target");
const { ALGUMON, SFF_EVENT, SFF_HOTDEAL, SFF_TRADE, COOLENJOY, QUASARZONE } =
  target;

if (!fs.existsSync("info.json")) {
  let data = {};
  Object.keys(target).map((key) => {
    data[key] = [];
  });

  fs.writeSync("info.json", JSON.stringify(data, null, 2));
}

var flag = 1;
const cb = () => {
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
      crawlingRequest(COOLENJOY);
      flag++;
      break;
    case 5:
      crawlingRequest(QUASARZONE);
      flag++;
      break;
    case 6:
      crawlingRequest(ALGUMON);
      flag = 1;
      break;
    default:
      break;
  }
};

scheduler.scheduleJob("*/2 * * * * *", cb);
