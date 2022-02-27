let cheerio = require("cheerio");
let request = require("request");
require("dotenv").config();

const TOKEN = process.env.TOKEN;

module.exports = function quasarzoneRequest(info) {
  const QUASARZONE_URL = "https://quasarzone.com/bbs/qb_saleinfo";
  return request(QUASARZONE_URL, (error, response, body) => {
    let quasarzone = info;
    console.log(quasarzone);
    let $ = cheerio.load(body);
    let newestInfoName = $("p.tit").first();
    let newestInfoPrice = $("div.market-info-sub").first();
    let newestInfoImg = $("div.market-info-list").first();
    let img = newestInfoImg.find("img.maxImg").attr("src");
    console.log(img);
    let link = newestInfoName.find("a.subject-link").attr("href").split("/");
    link = QUASARZONE_URL + `/${link[3]}/${link[4]}`;
    console.log(link);
    let name = newestInfoName.find("span.ellipsis-with-reply-cnt").text();
    console.log(name);
    let price = newestInfoPrice.find("span.text-orange").text();
    console.log(price);
    if (quasarzone.link !== link) {
      quasarzone.link = link;
      quasarzone.name = name;
      quasarzone.price = price;
      quasarzone.img = img;
      // 카톡 메시지 전송
      var dataString = `template_object={
            "object_type": "text",
            "text": "${name} / ${price} / ${link}",
            "image_url": "${img}",
            "link": {
                "web_url": "${link}",
                "mobile_web_url": "${link}"
            }
        }`;

      var headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Bearer " + TOKEN,
      };

      var options = {
        url: "https://kapi.kakao.com/v2/api/talk/memo/default/send",
        method: "POST",
        headers: headers,
        body: dataString,
      };

      function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log("메시지 전송 완료.");
        } else {
          console.log(body);
          console.log(error);
        }
      }

      request(options, callback);
    }
  });
};
