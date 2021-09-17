const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reservationSchema = new Schema({
  checkIn: {
    type: Date,
    default: Date.now(),
    required: [true, "Must enter a check-in date"],
  },
  checkOut: {
    type: Date,
    default: Date.now(),
    required: [true, "Must enter a check-out date"],
  },

  numberOfRooms: { type: Number, min: 0, max: 8 },

  numberOfGuests: { type: Number, min: 0, max: 8 },

  roomType: { type: String },

  price: { type: Number },

  guestId: [{ type: Schema.Types.ObjectId, ref: "User" }],

  hotelID: [{ type: Schema.Types.ObjectId, ref: "Hotel" }],
});

module.exports = mongoose.model("Reservation", reservationSchema);
