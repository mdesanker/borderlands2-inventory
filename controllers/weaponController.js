const Weapon = require("../models/weapon");

// Display home page
exports.index = function (req, res, next) {
  // res.send("NOT IMPLEMENTED: Site home page");
  res.render("index", {
    title: "Borderlands 2 - Database",
    subtitle: "Weapons List",
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
