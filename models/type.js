const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const descriptions = {
  Pistol:
    "Versatile class of weapons usually suited to short-to-medium range combat, typically with fast reload speed. Sub-types include auto-firing machine pistols with larger magazines but lower accuracy, middle-of-the-road repeaters, and revolvers with longer range and higher accuracy but slower reloads and lower ammo capacity.",
  SMG: "High rate of fire and low recoil, good at close range and decent at medium range. Usually lower per-round damage than pistols of lower level, but greater rate of fire means higher DPS, and tend to have high capacity magazines.",
  Shotgun:
    "Fire multiple pellets, effective at close range but lowest accuracy of any weapon type. Sub-types include single-barrel fast-firing weapons with larger magazines, medium-range weapons with low spread, and multi-barrel weapons with huge per-shot damage but slow rates of fire and frequent reloads.",
  "Assault Rifle":
    "Versatile medium/long range weapon. Sub-types include accurate, high-damage semi-auto weapons, general-purpose burst or automatic rifles, and high-capacity light machine guns with heavy recoil. Special assault rifles can fire grenades or rockets with standard rifle ammunition, though at a cost of multiple rounds per shot.",
  "Sniper Rifle":
    "High-damage, accurate weapons which are most effective at long range, usually with very limited magazine size and slow rates of fire. They are almost always equipped with scopes, and often have a bonus to Critical Hit Damage. Unlike the original Borderlands, fully automatic sniper rifles are not limited to a single very rare model.",
  "Rocket Launcher":
    "Powerful shoulder-fired weapons with many positive firing characteristics, but low ammo capacity, long reload time and expensive ammo. Subtypes include high-velocity cannons, low-velocity cruise missiles with devastatingly high damage and shotgun-like spread launchers.",
};

const TypeSchema = new Schema({
  name: {
    type: String,
    required: true,
    enum: [
      "Pistol",
      "SMG",
      "Shotgun",
      "Assault Rifle",
      "Sniper Rifle",
      "Rocket Launcher",
    ],
  },
});

// Virtual for type description
TypeSchema.virtual("description").get(function () {
  return descriptions[this.name];
});

// Virtual for type's URL
TypeSchema.virtual("url").get(function () {
  return "/catalog/type/" + this._id;
});

module.exports = mongoose.model("Type", TypeSchema);
