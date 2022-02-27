let scheduler = require("node-schedule");
let quasarzoneRequest = require("./quasarzoneRequest");

let quasarzone = {
  link: "",
  name: "",
  price: "",
  img: "",
};

const schedule = scheduler.scheduleJob("*/10 * * * * *", function () {
  quasarzoneRequest(quasarzone);
});
