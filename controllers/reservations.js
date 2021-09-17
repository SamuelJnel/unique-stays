const Reservation = require("../models/reservation");
const Hotel = require("../models/hotel");
const Guest = require("../models/guest");

module.exports = {
  index,
  createReservation,
  details,
  deleteReservation,
  editReservations,
  update,
};

function details(req, res) {
  Guest.find({}, function (err, guest) {
    Reservation.find({}, function (err, reservations) {
      Hotel.find({}, function (err, hotels) {
        res.render("reservations/show", {
          guest,
          user: req.user,
          hotels,
          reservations,
        });
      });
    });
  });
}

function index(req, res) {
  const newDate = new Reservation();

  const ci = newDate.checkIn;
  const co = newDate.checkOut;

  const checkInDate = ci.toISOString().slice(0, 16);
  const checkOutDate = co.toISOString().slice(0, 16);

  const hotelId = req.params.id;
  Hotel.find({}, function (err, hotels) {
    res.render("reservations/index", {
      guest: req.user,
      hotels,
      hotelId,
      checkInDate,
      checkOutDate,
    });
  });
}

async function createReservation(req, res) {
  const hotelDetails = req.params.id;

  const loggedInGuest = await Guest.findOne({
    googleId: req.user.googleId,
  });

  const booking = new Reservation(req.body);
  booking.guestId.push(loggedInGuest._id);
  booking.hotelID.push(hotelDetails);
  await booking.save();

  //const bookedHotel = await Hotel.findOne({ _id: req.params.id });

  //bookedHotel.hotelReservations.push(booking._id); //putting reservations into hotel
  //await bookedHotel.save();

  res.redirect(`/reservations`);
}

function deleteReservation(req, res) {
  Reservation.deleteOne(req.params.id, function (err, reservation) {
    res.redirect("/reservations");
  });
}

function editReservations(req, res) {
  Reservation.findById(req.params.id, function (err, reservation) {
    hotelId = reservation.hotelID;

    res.render("reservations/edit", { hotelId, reservation });
  });
}

async function update(req, res) {
  const updateReservation = await Reservation.findOneAndUpdate(
    req.params.id,
    req.body
  );
  await updateReservation.save();
  res.redirect("/reservations");
}
