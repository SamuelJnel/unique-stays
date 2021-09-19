const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hotelSchema = new Schema({
  name: { type: String },

  image: { type: String },

  details: { type: String },

  location: { type: String },
});

module.exports = mongoose.model("Hotel", hotelSchema);
