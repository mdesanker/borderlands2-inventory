const Weapon = require("../models/weapon");
const Manufacturer = require("../models/manufacturer");
const Element = require("../models/element");
const Type = require("../models/type");
const Rarity = require("../models/rarity");

const async = require("async");

// Display home page
exports.index = async function (req, res, next) {
  let results;
  try {
    results = await async.parallel({
      weaponCount: function (cb) {
        Weapon.countDocuments({}, cb);
      },
      manufacturerCount: function (cb) {
        Manufacturer.countDocuments({}, cb);
      },
      typeCount: function (cb) {
        Type.countDocuments({}, cb);
      },
      elementCount: function (cb) {
        Element.countDocuments({}, cb);
      },
      rarityCount: function (cb) {
        Rarity.countDocuments({}, cb);
      },
    });
  } catch (err) {
    return next(err);
  }
  res.render("index", {
    title: "Borderlands 2 - Database",
    data: results,
  });
};

// Display list of all weapons
exports.weaponList = function (req, res, next) {
  res.send("NOT IMPLEMENTED: Weapon list");
};

// Display detail for specific weapon
exports.weaponDetail = function (req, res, next) {
  res.send("NOT IMPLEMENTED: Weapon detail: " + req.params.id);
};

// Display weapon create form on GET
exports.weaponCreateGet = function (req, res, next) {
  res.send("NOT IMPLEMENTED: Weapon create GET");
};

// Display weapon create on POST
exports.weaponCreatePost = function (req, res, next) {
  res.send("NOT IMPLEMENTED: Weapon create POST");
};

// Display weapon delete form on GET
exports.weaponDeleteGet = function (req, res, next) {
  res.send("NOT IMPLEMENTED: Weapon delete GET");
};

// Display weapon delete on POST
exports.weaponDeletePost = function (req, res, next) {
  res.send("NOT IMPLEMENTED: Weapon delete POST");
};

// Display weapon update form on GET
exports.weaponUpdateGet = function (req, res, next) {
  res.send("NOT IMPLEMENTED: Weapon update GET");
};

// Display weapon update on POST
exports.weaponUpdatePost = function (req, res, next) {
  res.send("NOT IMPLEMENTED: Weapon update POST");
};
