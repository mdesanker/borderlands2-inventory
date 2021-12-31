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
exports.weaponList = async function (req, res, next) {
  let weaponList;
  try {
    weaponList = await Weapon.find({})
      .sort({ name: 1 })
      .populate("manufacturer type element rarity");
  } catch (err) {
    return next(err);
  }
  res.render("weaponList", { title: "Weapon List", list: weaponList });
};

// Display detail for specific weapon
exports.weaponDetail = async function (req, res, next) {
  let weaponDetail;
  try {
    weaponDetail = await Weapon.findById(req.params.id).populate(
      "type manufacturer element rarity"
    );
  } catch (err) {
    return next(err);
  }
  // Not found
  if (weaponDetail == null) {
    const err = new Error("Weapon not found");
    err.status = 404;
    return next(err);
  }
  // Successful, so render
  res.render("weaponDetail", {
    title: "Weapon Detail",
    detail: weaponDetail,
  });
};

// Display weapon create form on GET
exports.weaponCreateGet = async function (req, res, next) {
  let results;
  try {
    results = await async.parallel({
      types: function (cb) {
        Type.find({}, cb).sort({ name: 1 });
      },
      elements: function (cb) {
        Element.find({}, cb).sort({ name: 1 });
      },
      rarities: function (cb) {
        Rarity.find({}, cb).sort({ level: 1 });
      },
    });
  } catch (err) {
    return next(err);
  }
  res.render("weaponForm", {
    title: "Create Weapon",
    types: results.types,
    elements: results.elements,
    rarities: results.rarities,
  });
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
