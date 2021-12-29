const Element = require("../models/element");

// Display list of all elements
exports.elementList = function (req, res, next) {
  res.send("NOT IMPLEMENTED: Element list");
};

// Display detail page for specific element
exports.elementDetail = function (req, res, next) {
  res.send("NOT IMPLEMENTED: Element detail: " + req.params.id);
};
