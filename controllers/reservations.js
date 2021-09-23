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

async function details(req, res) {
  const userId = res.locals.guest.id;

  let reservations = await Reservation.find({ guestId: userId }).populate(
    "hotelId"
  );
  res.render("reservations/show", {
    reservations,
  });
}

function index(req, res) {
  const newDate = new Reservation();

  const ci = newDate.checkIn;
  const co = newDate.checkOut;

  const checkInDate = ci.toISOString().slice(0, 16);
  const checkOutDate = co.toISOString().slice(0, 16);

  const hotelId = req.params.id;

  Hotel.findById(req.params.id, function (err, hotels) {
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
  const loggedInGuest = await Guest.findOne({
    googleId: res.locals.guest.googleId,
  });

  const bookedHotel = await Hotel.findOne({ _id: req.params.id });

  const booking = new Reservation(req.body);
  booking.guestId.push(loggedInGuest._id); // put guest id into reservation
  booking.hotelId.push(bookedHotel._id); // put hotel id into reservation
  await booking.save();

  loggedInGuest.reservation.push(booking._id); ///putting reservation into guest

  await loggedInGuest.save();
  res.redirect(`/reservations`);
}

function deleteReservation(req, res) {
  const filter = req.params.reservationId;

  Reservation.deleteOne(req.params.id, function (err) {
    Guest.findById(res.locals.guest, function (err, guests) {
      console.log(guests.reservation);

      const index = guests.reservation.indexOf(filter);
      console.log(index);
      guests.reservation.splice(index, 1);
      guests.save(function (err) {
        console.log(guests);
        res.redirect("/reservations");
      });
    });
  });
}

function editReservations(req, res) {
  Reservation.findById(req.params.id, function (err, reservation) {
    let currentCheckIn = reservation.checkIn.toISOString().slice(0, 16);
    let currentCheckOut = reservation.checkOut.toISOString().slice(0, 16);

    let hotelDetails = reservation.hotelId;
    Hotel.findById(reservation.hotelId);

    Hotel.findById(reservation.hotelId, function (err, hotel) {
      res.render("reservations/edit", {
        reservation,
        currentCheckIn,
        currentCheckOut,
        hotel,
      });
    });
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
