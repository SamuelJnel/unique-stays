const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const guestSchema = new Schema({
  name: String,
  email: String,
  googleId: String,
  reservation: [{ type: Schema.Types.ObjectId, ref: "Reservation" }],
});

module.exports = mongoose.model("Guest", guestSchema);
