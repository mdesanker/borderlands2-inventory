const express = require("express");
const router = express.Router();

// Require controller modules
const elementController = require("../controllers/elementController");
const manufacturerController = require("../controllers/manufacturerController");
const rarityController = require("../controllers/rarityController");
const typeController = require("../controllers/typeController");
const weaponController = require("../controllers/weaponController");

/// WEAPON ROUTES ///

// GET catalog home page
router.get("/", weaponController.index);

// GET request for creating weapon
router.get("/weapon/create", weaponController.weaponCreateGet);

// POST request for creating weapon
router.post("/weapon/create", weaponController.weaponCreatePost);

// GET request to delete weapon
router.get("/weapon/:id/delete", weaponController.weaponDeleteGet);

// POST request to delete weapon
router.post("/weapon/:id/delete", weaponController.weaponDeletePost);

// GET request to update weapon
router.get("/weapon/:id/update", weaponController.weaponUpdateGet);

// POST request to update weapon
router.post("/weapon/:id/update", weaponController.weaponUpdatePost);

// GET request for specific weapon
router.get("/weapon/:id", weaponController.weaponDetail);

// GET request for list of all weapons
router.get("/weapons", weaponController.weaponList);

/// MANUFACTURER ROUTES ///

// GET request for creating manufacturer
router.get(
  "/manufacturer/create",
  manufacturerController.manufacturerCreateGet
);

// POST request for creating manufacturer
router.post(
  "/manufacturer/create",
  manufacturerController.manufacturerCreatePost
);

// GET request to delete manufacturer
router.get(
  "/manufacturer/:id/delete",
  manufacturerController.manufacturerDeleteGet
);

// POST request to delete manufacturer
router.post(
  "/manufacturer/:id/delete",
  manufacturerController.manufacturerDeletePost
);

// GET request to update manufacturer
router.get(
  "/manufacturer/:id/update",
  manufacturerController.manufacturerUpdateGet
);

// POST request to update manufacturer
router.post(
  "/manufacturer/:id/update",
  manufacturerController.manufacturerUpdatePost
);

// GET request for specific manufacturer
router.get("/manufacturer/:id", manufacturerController.manufacturerDetail);

// GET request for list of all manufacturers
router.get("/manufacturers", manufacturerController.manufacturerList);

/// ELEMENT ROUTES ///

// GET request for specific element
router.get("/element/:id", elementController.elementDetail);

// GET request for list of all elements
router.get("/elements", elementController.elementList);

/// TYPE ROUTES ///

// GET request for specific type
router.get("/type/:id", typeController.typeDetail);

// GET request for list of all types
router.get("/types", typeController.typeList);

/// RARITY ROUTES ///

// GET request for specific rarity
router.get("/rarity/:id", rarityController.rarityDetail);

// GET request for list of all rarities
router.get("/rarities", rarityController.rarityList);

module.exports = router;
