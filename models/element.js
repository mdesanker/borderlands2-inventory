const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ElementSchema = new Schema({
  name: {
    type: String,
    enum: ["Corrosive", "Incendiary", "Explosive", "Shock", "Slag"],
  },
});

// Virtual for element URL
ElementSchema.virtual("url").get(function () {
  return "/catalog/element/" + this._id;
});

module.exports = mongoose.model("Element", ElementSchema);
