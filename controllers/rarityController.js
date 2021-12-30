const Rarity = require("../models/rarity");

// Display list of all rarities
exports.rarityList = async function (req, res, next) {
  let rarityList;
  try {
    rarityList = await Rarity.find({}).sort({ level: 1 });
  } catch (err) {
    return next(err);
  }
  res.render("rarityList", { title: "Rarity List", rarityList: rarityList });
};

// Display details for specific rarity
exports.rarityDetail = function (req, res, next) {
  res.send("NOT IMPLEMENTED: Rarity detail: " + req.params.id);
};
