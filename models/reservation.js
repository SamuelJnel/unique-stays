const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reservationSchema = new Schema({
  checkIn: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  checkOut: {
    type: Date,
    default: Date.now(),
    required: true,
  },

  numberOfRooms: { type: Number, min: 0, max: 8 },

  numberOfGuests: { type: Number, min: 0, max: 8 },

  roomType: { type: String },

  price: { type: String },

  guestId: [{ type: Schema.Types.ObjectId, ref: "Guest" }],

  hotelId: [{ type: Schema.Types.ObjectId, ref: "Hotel" }],
});

module.exports = mongoose.model("Reservation", reservationSchema);
