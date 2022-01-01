const Manufacturer = require("../models/manufacturer");
const Weapon = require("../models/weapon");

const async = require("async");
const { body, validationResult } = require("express-validator");

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

    // Create a genre object with escaped and trimmed data
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
