const Rarity = require("../models/rarity");

// Display list of all rarities
exports.rarityList = function (req, res, next) {
  res.send("NOT IMPLEMENTED: Rarity list");
};

// Display details for specific rarity
exports.rarityDetail = function (req, res, next) {
  res.send("NOT IMPLEMENTED: Rarity detail: " + req.params.id);
};
