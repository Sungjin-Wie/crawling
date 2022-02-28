let scheduler = require("node-schedule");
let {
  sffgalleryTradeRequest,
  sffgalleryHotDealRequest,
  sffgalleryEventRequest,
  quasarzoneRequest,
  coolenjoyRequest,
  algumonRequest,
} = require("./requests");

var flag = 1;
const cb = () => {
  switch (flag) {
    case 1:
      quasarzoneRequest();
      flag++;
      break;
    case 2:
      sffgalleryTradeRequest();
      flag++;
      break;
    case 3:
      sffgalleryHotDealRequest();
      flag++;
      break;
    case 4:
      sffgalleryEventRequest();
      flag++;
      break;
    case 5:
      coolenjoyRequest();
      flag++;
      break;
    case 6:
      algumonRequest();
      flag = 1;
      break;
    default:
      break;
  }
};

scheduler.scheduleJob("*/2 * * * * *", cb);
