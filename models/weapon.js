const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WeaponSchema = new Schema({
  name: { type: String, required: true, maxlength: 100 },
  description: { type: String },
  sources: { type: String },
  type: { type: mongoose.Types.ObjectId, ref: "Type", required: true },
  manufacturer: {
    type: mongoose.Types.ObjectId,
    ref: "Manufacturer",
    required: true,
  },
  element: [{ type: mongoose.Types.ObjectId, ref: "Element" }],
  rarity: {
    type: mongoose.Types.ObjectId,
    ref: "Rarity",
    required: true,
    maxlength: 100,
  },
});

// Virtual for weapon's URL
WeaponSchema.virtual("url").get(function () {
  return "/catalog/weapon/" + this._id;
});

module.exports = mongoose.model("Weapon", WeaponSchema);
