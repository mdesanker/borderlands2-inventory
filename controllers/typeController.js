const Type = require("../models/type");

// Display list of all types
exports.typeList = function (req, res, next) {
  res.send("NOT IMPLEMENTED: Type list");
};

// Display detail for specific type
exports.typeDetail = function (req, res, next) {
  res.send("NOT IMPLEMENTED: Type detail: " + req.params.id);
};
