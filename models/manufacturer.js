const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ManufacturerSchema = new Schema({
  name: { type: String, required: true, maxlength: 100 },
  description: { type: String },
});

// Virutal for manufacturer URL
ManufacturerSchema.virtual("url").get(function () {
  return "/catalog/manufacturer/" + this._id;
});

module.exports = mongoose.model("Manufacturer", ManufacturerSchema);
