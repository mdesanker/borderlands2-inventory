const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
  description: { type: String },
});

// Virtual for type's URL
TypeSchema.virtual("url").get(function () {
  return "/catalog/type/" + this._id;
});

module.exports = mongoose.model("Type", TypeSchema);
