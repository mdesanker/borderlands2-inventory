const Type = require("../models/type");
const Weapon = require("../models/weapon");

const async = require("async");

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
exports.typeDetail = async function (req, res, next) {
  let typeDetail;
  try {
    typeDetail = await async.parallel({
      type: function (cb) {
        Type.findById(req.params.id, cb);
      },
      weapons: function (cb) {
        Weapon.find({ type: req.params.id }, cb).sort({ name: 1 });
      },
    });
  } catch (err) {
    return next(err);
  }
  // Type not found
  if (typeDetail.type == null) {
    const err = new Error("Type not found");
    type.status = 404;
    return next(err);
  }
  // Successful, so render
  res.render("typeDetail", { title: "Type Detail", detail: typeDetail });
};
