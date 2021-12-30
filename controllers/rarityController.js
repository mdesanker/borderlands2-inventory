const Rarity = require("../models/rarity");
const Weapon = require("../models/weapon");

const async = require("async");

// Display list of all rarities
exports.rarityList = async function (req, res, next) {
  let rarityList;
  try {
    rarityList = await Rarity.find({}).sort({ level: 1 });
  } catch (err) {
    return next(err);
  }
  res.render("rarityList", { title: "Rarity List", list: rarityList });
};

// Display details for specific rarity
exports.rarityDetail = async function (req, res, next) {
  let rarityDetail;
  try {
    rarityDetail = await async.parallel({
      rarity: function (cb) {
        Rarity.findById(req.params.id, cb);
      },
      weapons: function (cb) {
        Weapon.find({ rarity: req.params.id }, cb).sort({ name: 1 });
      },
    });
  } catch (err) {
    return next(err);
  }
  // Rarity not found
  if (rarityDetail.rarity == null) {
    const err = new Error("Rarity not found");
    err.status = 404;
    return next(err);
  }
  // Successful, so render
  res.render("rarityDetail", { title: "Rarity Detail", detail: rarityDetail });
};
