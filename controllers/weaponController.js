const Weapon = require("../models/weapon");
const Manufacturer = require("../models/manufacturer");
const Element = require("../models/element");
const Type = require("../models/type");
const Rarity = require("../models/rarity");

const async = require("async");

const { body, validationResult } = require("express-validator");

// Display home page
exports.index = async function (req, res, next) {
  let results;
  try {
    results = await async.parallel({
      weaponCount: function (cb) {
        Weapon.countDocuments({}, cb);
      },
      manufacturerCount: function (cb) {
        Manufacturer.countDocuments({}, cb);
      },
      typeCount: function (cb) {
        Type.countDocuments({}, cb);
      },
      elementCount: function (cb) {
        Element.countDocuments({}, cb);
      },
      rarityCount: function (cb) {
        Rarity.countDocuments({}, cb);
      },
    });
  } catch (err) {
    return next(err);
  }
  res.render("index", {
    title: "Borderlands 2 - Database",
    data: results,
  });
};

// Display list of all weapons
exports.weaponList = async function (req, res, next) {
  let weaponList;
  try {
    weaponList = await Weapon.find({})
      .sort({ name: 1 })
      .populate("manufacturer type element rarity");
  } catch (err) {
    return next(err);
  }
  res.render("weaponList", { title: "Weapon List", list: weaponList });
};

// Display detail for specific weapon
exports.weaponDetail = async function (req, res, next) {
  let weaponDetail;
  try {
    weaponDetail = await Weapon.findById(req.params.id).populate(
      "type manufacturer element rarity"
    );
  } catch (err) {
    return next(err);
  }
  // Not found
  if (weaponDetail == null) {
    const err = new Error("Weapon not found");
    err.status = 404;
    return next(err);
  }
  // Successful, so render
  res.render("weaponDetail", {
    title: "Weapon Detail",
    detail: weaponDetail,
  });
};

// Display weapon create form on GET
exports.weaponCreateGet = async function (req, res, next) {
  let results;
  try {
    results = await async.parallel({
      manufacturers: function (cb) {
        Manufacturer.find({}, cb).sort({ name: 1 });
      },
      types: function (cb) {
        Type.find({}, cb).sort({ name: 1 });
      },
      elements: function (cb) {
        Element.find({}, cb).sort({ name: 1 });
      },
      rarities: function (cb) {
        Rarity.find({}, cb).sort({ level: 1 });
      },
    });
  } catch (err) {
    return next(err);
  }
  res.render("weaponForm", {
    title: "Create Weapon",
    manufacturers: results.manufacturers,
    types: results.types,
    elements: results.elements,
    rarities: results.rarities,
  });
};

// Display weapon create on POST
exports.weaponCreatePost = [
  // Convert elements to an array
  (req, res, next) => {
    if (!(req.body.element instanceof Array)) {
      if (typeof req.body.element === "undefined") {
        req.body.element = [];
      } else {
        req.body.element = new Array(req.body.element);
      }
      console.log(req.body);
    }
    next();
  },

  // Validate and sanitize
  body("name", "Name is required").trim().isLength({ min: 1 }).escape(),
  body("description").optional({ checkFalsy: true }).trim().escape(),
  body("type", "Type is required").escape(),
  body("manufacturer", "Manufacturer is required")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("element", "Element is required").escape(),
  body("rarity", "Rarity is required").escape(),

  // Process request after validaiton and sanitization
  (req, res, next) => {
    console.log("------PROCESSING REQUEST-------");
    // Extract validation errors from request
    const errors = validationResult(req);

    // Create weapon object with data
    const weapon = new Weapon({
      name: req.body.name,
      description: req.body.description,
      manufacturer: req.body.manufacturer,
      type: req.body.type,
      element: req.body.element,
      rarity: req.body.rarity,
    });

    console.log("NEW WEAPON:", weapon);

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages

      // Get all types, elements, and rarities for form
      async.parallel(
        {
          types: function (cb) {
            Type.find({}, cb).sort({ name: 1 });
          },
          elements: function (cb) {
            Element.find({}, cb).sort({ name: 1 });
          },
          rarities: function (cb) {
            Rarity.find({}, cb).sort({ level: 1 });
          },
        },
        function (err, results) {
          if (err) next(err);

          // Mark selected genres as checked
          for (let i = 0; i < results.elements.length; i++) {
            if (weapon.element.indexOf(results.elements[i]._id) > -1) {
              results.genres[i].checked = "true";
            }
          }
          res.render("weaponForm", {
            title: "Create Weapon",
            types: results.types,
            elements: results.elements,
            rarities: results.rarities,
            weapon: weapon,
            errors: errars.array(),
          });
        }
      );
      return;
    } else {
      // Data from form is valid. Save weapon
      weapon.save(function (err) {
        if (err) next(err);
        // Successful, redirect to new weapon
        res.redirect(weapon.url);
      });
    }
  },
];

// Display weapon delete form on GET
exports.weaponDeleteGet = async function (req, res, next) {
  let result;
  try {
    result = await Weapon.findById(req.params.id).populate(
      "type manufacturer element rarity"
    );
  } catch (err) {
    return next(err);
  }

  res.render("weaponDelete", { title: "Delete Weapon", weapon: result });
};

// Display weapon delete on POST
exports.weaponDeletePost = function (req, res, next) {
  Weapon.findByIdAndRemove(req.body.weaponid, function deleteWeapon(err) {
    if (err) next(err);
    res.redirect("/catalog/weapons");
  });
};

// Display weapon update form on GET
exports.weaponUpdateGet = async function (req, res, next) {
  let results;
  try {
    results = await async.parallel({
      weapon: function (cb) {
        Weapon.findById(req.params.id, cb);
      },
      manufacturers: function (cb) {
        Manufacturer.find({}, cb).sort({ name: 1 });
      },
      types: function (cb) {
        Type.find({}, cb).sort({ name: 1 });
      },
      elements: function (cb) {
        Element.find({}, cb).sort({ name: 1 });
      },
      rarities: function (cb) {
        Rarity.find({}, cb).sort({ level: 1 });
      },
    });
  } catch (err) {
    return next(err);
  }
  if (results.weapon == null) {
    // Weapon not found
    const err = new Error("Weapon not found");
    err.status = 404;
    return next(err);
  }
  // Mark selected elements as checked
  for (let i = 0; i < results.elements.length; i++) {
    for (let j = 0; j < results.weapon.element.length; j++) {
      if (
        results.elements[i]._id.toString() ===
        results.weapon.element[j]._id.toString()
      ) {
        results.elements[i].checked = "true";
      }
    }
  }
  // Render weapon form with database info
  res.render("weaponForm", {
    title: "Update Weapon",
    weapon: results.weapon,
    manufacturers: results.manufacturers,
    types: results.types,
    elements: results.elements,
    rarities: results.rarities,
  });
};

// Display weapon update on POST
exports.weaponUpdatePost = function (req, res, next) {
  res.send("NOT IMPLEMENTED: Weapon update POST");
};
