module.exports.update = {};

module.exports.delete = {
  oldItem: `
  DELETE FROM hotdeal 
  WHERE link=?
  `,
};

module.exports.insert = {
  newItem: `
  INSERT INTO hotdeal(targetId, title, link, nickName, price)
  values(?, ?, ?, ?, ?)
  `,
};

module.exports.select = {
  allWithTargetID: `
  SELECT * 
  FROM hotdeal
  WHERE targetID=?
  ORDER BY date ASC;
  `,
};
