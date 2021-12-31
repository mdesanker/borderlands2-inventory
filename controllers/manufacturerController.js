const Manufacturer = require("../models/manufacturer");
const Weapon = require("../models/weapon");

const async = require("async");

// Display list of all manufacturers
exports.manufacturerList = async function (req, res, next) {
  let manufacturerList;
  try {
    manufacturerList = await Manufacturer.find({}).sort({ name: 1 });
  } catch (err) {
    return next(err);
  }
  res.render("manufacturerList", {
    title: "Manufacturer List",
    list: manufacturerList,
  });
};

// Display manufacturer details
exports.manufacturerDetail = async function (req, res, next) {
  let manufacturerDetail;
  try {
    manufacturerDetail = await async.parallel({
      manufacturer: function (cb) {
        Manufacturer.findById(req.params.id, cb);
      },
      weapons: function (cb) {
        Weapon.find({ manufacturer: req.params.id }, cb).sort({ name: 1 });
      },
    });
  } catch (err) {
    return next(err);
  }
  // No result found
  if (manufacturerDetail.manufacturer == null) {
    const err = new Error("Manufacturer not found");
    err.status = 404;
    return next(err);
  }
  // Successful, so render
  res.render("manufacturerDetail", {
    title: "Manufacturer Detail",
    detail: manufacturerDetail,
  });
};

// Display manufacturer create form on GET
exports.manufacturerCreateGet = function (req, res, next) {
  res.render("manufacturerForm", { title: "Create Manufacturer" });
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
