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

  Hotel.findById(req.params.id, function (err, hotels) {
    console.log(hotels.name);

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
    googleId: res.locals.guest.googleId,
  });

  const bookedHotel = await Hotel.findOne({ _id: req.params.id });

  const booking = new Reservation(req.body);
  booking.guestId.push(loggedInGuest._id); // put guest id into reservation
  booking.hotelId.push(bookedHotel._id); // put hotel id into reservation
  await booking.save();

  loggedInGuest.reservation.push(booking._id); ///putting reservation into guest

  await loggedInGuest.save();

  console.log(`this is logged in guest${loggedInGuest}`);
  console.log(`this is booking${booking}`);
  console.log(`this is booked hotel${bookedHotel}`);

  res.redirect(`/reservations`);
}

function deleteReservation(req, res) {
  const filter = req.params.reservationId;

  Reservation.deleteOne(req.params.id, function (err, reservations) {
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
    const currentCheckIn = reservation.checkIn.toISOString().slice(0, 16);
    const currentCheckOut = reservation.checkIn.toISOString().slice(0, 16);
    hotelIds = reservation.hotelId;

    console.log(currentCheckIn);
    console.log(currentCheckOut);

    res.render("reservations/edit", {
      hotelIds,
      reservation,
      currentCheckIn,
      currentCheckOut,
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
