const Manufacturer = require("../models/manufacturer");

// Display list of all manufacturers
exports.manufacturerList = function (req, res, next) {
  res.send("NOT IMPLEMENTED: Manufacturer list");
};

// Display manufacturer details
exports.manufacturerDetail = function (req, res, next) {
  res.send("NOT IMPLEMENTED: Manufacturer detail: " + req.params.id);
};

// Display manufacturer create form on GET
exports.manufacturerCreateGet = function (req, res, next) {
  res.send("NOT IMPLEMENTED: Manufacturer create GET");
};

// Display manufacturer create on POST
exports.manufacturerCreatePost = function (req, res, next) {
  res.send("NOT IMPLEMENTED: Manufacturer create POST");
};

// Display manufacturer delete form on GET
exports.manufacturerDeleteGet = function (req, res, next) {
  res.send("NOT IMPLEMENTED: Manufacturer delete GET");
};

// Display manufacturer delete on POST
exports.manufacturerDeletePost = function (req, res, next) {
  res.send("NOT IMPLEMENTED: Manufacturer delete POST");
};

// Display manufacturer update form on GET
exports.manufacturerUpdateGet = function (req, res, next) {
  res.send("NOT IMPLEMENTED: Manufacturer update GET");
};

// Display manufacturer update on POST
exports.manufacturerUpdatePost = function (req, res, next) {
  res.send("NOT IMPLEMENTED: Manufacturer update POST");
};
