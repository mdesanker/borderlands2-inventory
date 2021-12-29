#! /usr/bin/env node

console.log(
  "This script populates some test weapons, manufacturers, elements, types, and rarities to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/borderlands2_inventory?retryWrites=true"
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith("mongodb")) {
  console.log(
    "ERROR: You need to specify a valid MongoDB URL as the first argument"
  );
  return;
}
*/

const async = require("async");
const Weapon = require("./models/weapon");
const Type = require("./models/type");
const Manufacturer = require("./models/manufacturer");
const Element = require("./models/element");
const Rarity = require("./models/rarity");

const mongoose = require("mongoose");
const mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const weapons = [];
const types = [];
const manufacturers = [];
const elements = [];
const rarities = [];

function weaponCreate(
  name,
  description,
  sources,
  type,
  manufacturer,
  element,
  rarity,
  cb
) {
  const weaponDetail = {
    name: name,
    type: type,
    manufacturer: manufacturer,
    rarity: rarity,
  };

  if (description != false) weaponDetail.description = description;
  if (sources != false) weaponDetail.sources = sources;
  if (element != false) weaponDetail.element = element;

  const weapon = new Weapon(weaponDetail);

  weapon.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New weapon: " + weapon);
    weapons.push(weapon);
    cb(null, weapon);
  });
}

function manufacturerCreate(name, cb) {
  const manufacturer = new Manufacturer({ name: name });

  manufacturer.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New manufacturer: " + manufacturer);
    manufacturers.push(manufacturer);
    cb(null, manufacturer);
  });
}

function typeCreate(name, cb) {
  const type = new Type({ name: name });

  type.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New type: " + type);
    types.push(type);
    cb(null, type);
  });
}

function elementCreate(name, cb) {
  const element = new Element({ name: name });

  element.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New element: " + element);
    elements.push(element);
    cb(null, element);
  });
}

function rarityCreate(name, cb) {
  const rarity = new Rarity({ name: name });

  rarity.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New rarity: " + rarity);
    rarities.push(rarity);
    cb(null, rarity);
  });
}

async function createManufacturersElementsTypesRarities(cb) {
  try {
    let results = await async.series([
      function (callback) {
        manufacturerCreate("Maliwan", callback);
      },
      function (callback) {
        manufacturerCreate("Torque", callback);
      },
      function (callback) {
        elementCreate("Corrosive", callback);
      },
      function (callback) {
        elementCreate("Incendiary", callback);
      },
      function (callback) {
        elementCreate("Explosive", callback);
      },
      function (callback) {
        typeCreate("Pistol", callback);
      },
      function (callback) {
        typeCreate("Sniper Rifle", callback);
      },
      function (callback) {
        rarityCreate("Blue (rare)", callback);
      },
      function (callback) {
        rarityCreate("Orange (legendary)", callback);
      },
    ]);
  } catch (err) {
    console.error(err);
  }
}

async function createWeapons(cb) {
  try {
    let results = await async.parallel([
      function (callback) {
        weaponCreate(
          "Rubi",
          "Whenever I'm caught between two evils, I take the one I've never tried",
          false,
          types[0],
          manufacturers[0],
          [elements[0], elements[1]],
          rarities[0],
          callback
        );
      },
      function (callback) {
        weaponCreate(
          "Unkempt Harold",
          "Did I fire six shots, or only five? Three? Seven. Whatever.",
          false,
          types[0],
          manufacturers[1],
          [elements[2]],
          rarities[1],
          callback
        );
      },
      function (callback) {
        weaponCreate(
          "Volcano",
          "Pele humbly requests a sacrifice, if it's not too much trouble.",
          false,
          types[1],
          manufacturers[0],
          [elements[1]],
          rarities[1],
          callback
        );
      },
    ]);
  } catch (err) {
    console.error(err);
  }
}

async.series(
  [createManufacturersElementsTypesRarities, createWeapons],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log("FINAL ERR: " + err);
    } else {
      console.log("WEAPONS: " + weapons);
    }
    // Complete, disconnect from database
    mongoose.connection.close();
  }
);
