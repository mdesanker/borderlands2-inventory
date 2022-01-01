const Manufacturer = require("../models/manufacturer");
const Weapon = require("../models/weapon");

const async = require("async");
const { body, validationResult } = require("express-validator");
const manufacturer = require("../models/manufacturer");

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
  console.log("DETAIL", manufacturerDetail.manufacturer.url);
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
exports.manufacturerCreatePost = [
  // Validate and sanitize the fields
  body("name", "Manufacturer name required")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("description").optional({ checkFalsy: true }).trim().escape(),

  // Process request after validation and sanitization
  (req, res, next) => {
    // Extract validation errors from req
    const errors = validationResult(req);
    console.log("ERRORS", errors);

    // Create a manufacturer object with escaped and trimmed data
    const manufacturer = new Manufacturer({
      name: req.body.name,
      description: req.body.description,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form with sanitized values/error msgs
      res.render("manufacturerForm", {
        title: "Create Manufacturer",
        manufacturer: manufacturer,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form valid
      // Check if manufacturer already exists
      Manufacturer.findOne({ name: req.body.name }).exec(function (
        err,
        foundManufacturer
      ) {
        if (err) {
          return next(err);
        }
        if (foundManufacturer) {
          // Manufacturer exists, redirect to details
          res.redirect(foundManufacturer.url);
        } else {
          manufacturer.save(function (err) {
            if (err) {
              return next(err);
            }
            // Manufacturer saved, redirect to details
            res.redirect(manufacturer.url);
          });
        }
      });
    }
  },
];

// Display manufacturer delete form on GET
exports.manufacturerDeleteGet = async function (req, res, next) {
  let results;
  try {
    results = await async.parallel({
      manufacturer: function (cb) {
        Manufacturer.findById(req.params.id).exec(cb);
      },
      weapons: function (cb) {
        Weapon.find({ manufacturer: req.params.id }).exec(cb);
      },
    });
  } catch (err) {
    return next(err);
  }
  if (results.manufacturer == null) res.redirect("/catalog/manufacturers");
  res.render("manufacturerDelete", {
    title: "Delete Manufacturer",
    manufacturer: results.manufacturer,
    weapons: results.weapons,
  });
};

// Display manufacturer delete on POST
exports.manufacturerDeletePost = async function (req, res, next) {
  let results;
  try {
    results = await async.parallel({
      manufacturer: function (cb) {
        Manufacturer.findById(req.params.id).exec(cb);
      },
      weapons: function (cb) {
        Weapon.find({ manufacturer: req.params.id }).exec(cb);
      },
    });
  } catch (err) {
    return next(err);
  }
  if (results.weapons.length > 0) {
    res.render("manufacturerDelete", {
      title: "Delete Manufacturer",
      manufacturer: results.manufacturer,
      weapons: results.weapons,
    });
    return;
  }
  Manufacturer.findByIdAndRemove(
    req.body.manufacturerid,
    function deleteManufacturer(err) {
      if (err) next(err);
      res.redirect("/catalog/manufacturers");
    }
  );
};

// Display manufacturer update form on GET
exports.manufacturerUpdateGet = async function (req, res, next) {
  let results;
  try {
    results = await Manufacturer.findById(req.params.id);
  } catch (err) {
    return next(err);
  }
  if (results == null) {
    const err = new Error("Manufacturer not found.");
    err.status = 404;
    return next(err);
  }
  res.render("manufacturerForm", {
    title: "Update Manufacturer",
    manufacturer: results,
  });
};

// Display manufacturer update on POST
exports.manufacturerUpdatePost = [
  // Validate and sanitize the fields
  body("name", "Manufacturer name required")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("description").optional({ checkFalsy: true }).trim().escape(),

  // Process request after validation and sanitization
  (req, res, next) => {
    // Extract validation errors from req
    const errors = validationResult(req);

    // Create a manufacturer object with escaped and trimmed data
    const manufacturer = new Manufacturer({
      name: req.body.name,
      description: req.body.description,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form with sanitized values/error msgs
      res.render("manufacturerForm", {
        title: "Update Manufacturer",
        manufacturer: manufacturer,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form valid
      // Update the record
      Manufacturer.findByIdAndUpdate(
        req.params.id,
        manufacturer,
        {},
        function (err, theManufacturer) {
          if (err) next(err);
          res.redirect(theManufacturer.url);
        }
      );
    }
  },
];
