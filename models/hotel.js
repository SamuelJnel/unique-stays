const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hotelSchema = new Schema({
  name: { type: String },

  details: { type: String },

  location: { type: String },

  // hotelReservations: [{ type: Schema.Types.ObjectId, ref: "Reservation" }],
});

module.exports = mongoose.model("Hotel", hotelSchema);
