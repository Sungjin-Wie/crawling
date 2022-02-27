let scheduler = require("node-schedule");
let quasarzoneRequest = require("./quasarzoneRequest");

let quasarzone = {
  link: "",
  name: "",
  price: "",
  img: "",
};

const cb = () => {
  quasarzoneRequest(quasarzone);
};

const schedule = scheduler.scheduleJob("*/10 * * * * *", cb);
