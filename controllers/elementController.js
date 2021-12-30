const Element = require("../models/element");
const Weapon = require("../models/weapon");

const async = require("async");

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
    list: elementList,
  });
};

// Display detail page for specific element
exports.elementDetail = async function (req, res, next) {
  let elementDetail;
  try {
    elementDetail = await async.parallel({
      element: function (cb) {
        Element.findById(req.params.id, cb);
      },
      weapons: function (cb) {
        Weapon.find({ element: req.params.id }, cb).sort({ name: 1 });
      },
    });
  } catch (err) {
    return next(err);
  }
  // Element not found
  if (elementDetail.element == null) {
    const err = new Error("Element not found");
    err.status = 404;
    return next(err);
  }
  // Successful, so render
  res.render("elementDetail", {
    title: "Element Detail",
    detail: elementDetail,
  });
};
