const {
  ALGUMON,
  SFF_EVENT,
  SFF_HOTDEAL,
  SFF_TRADE,
  QUASARZONE,
  COOLENJOY,
} = require("./target");

module.exports = function generateText(target, newestInfo) {
  let [site, category] = target.split("-");
  switch (target) {
    case SFF_EVENT:
    case SFF_HOTDEAL:
    case SFF_TRADE: {
      let { name, owner, link } = newestInfo;
      return `
${site} - ${category}
이름: ${name}
닉네임: ${owner}
${link}
`;
    }
    case ALGUMON: {
      let { name, price, link } = newestInfo;
      return `
${site} - ${category}
이름: ${name}
가격: ${price}
${link}
`;
    }
    case QUASARZONE: {
      let { name, price, link } = newestInfo;
      return `
${site} - ${category}
이름: ${name}
가격: ${price}
${link}
`;
    }
    case COOLENJOY: {
      let { name, link } = newestInfo;
      return `
${site} - ${category}
이름: ${name}
${link}
`;
    }
  }
};
