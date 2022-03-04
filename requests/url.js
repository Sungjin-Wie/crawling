const {
  SFF_EVENT,
  SFF_HOTDEAL,
  SFF_TRADE,
  ALGUMON,
  COOLENJOY,
  QUASARZONE,
} = require("./target");

let url = {};
url[
  SFF_EVENT
] = `https://gall.dcinside.com/mgallery/board/lists/?id=sff&sort_type=N&search_head=50&page=1`;
url[
  SFF_HOTDEAL
] = `https://gall.dcinside.com/mgallery/board/lists/?id=sff&sort_type=N&search_head=100&page=1`;
url[
  SFF_TRADE
] = `https://gall.dcinside.com/mgallery/board/lists/?id=sff&sort_type=N&search_head=40&page=1`;
url[ALGUMON] = "https://algumon.com";
url[COOLENJOY] = "https://coolenjoy.net/bbs/jirum";
url[QUASARZONE] = "https://quasarzone.com/bbs/qb_saleinfo";

module.exports = url;
