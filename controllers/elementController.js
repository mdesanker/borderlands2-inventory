const Element = require("../models/element");

// Display list of all elements
exports.elementList = async function (req, res, next) {
  let elementList;
  try {
    elementList = await Element.find({}).sort({ name: 1 });
  } catch (err) {
    return next(err);
  }
  res.render("elementList", {
    title: "Element List",
    elementList: elementList,
  });
};

// Display detail page for specific element
exports.elementDetail = function (req, res, next) {
  res.send("NOT IMPLEMENTED: Element detail: " + req.params.id);
};
