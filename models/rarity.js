const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RaritySchema = new Schema({
  name: { type: String, required: true, maxlength: 100 },
  level: { type: String, required: true },
  description: { type: String },
  color: { type: String },
});

// Virutal for rarity URL
RaritySchema.virtual("url").get(function () {
  return "/catalog/rarity/" + this._id;
});

module.exports = mongoose.model("Rarity", RaritySchema);
