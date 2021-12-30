const Type = require("../models/type");

// Display list of all types
exports.typeList = async function (req, res, next) {
  let typeList;
  try {
    typeList = await Type.find({}).sort({ name: 1 });
  } catch (err) {
    return next(err);
  }
  res.render("typeList", { title: "Type List", typeList: typeList });
};

// Display detail for specific type
exports.typeDetail = function (req, res, next) {
  res.send("NOT IMPLEMENTED: Type detail: " + req.params.id);
};
