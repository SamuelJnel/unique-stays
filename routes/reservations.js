var express = require("express");
var router = express.Router();

const reservationsControllers = require("../controllers/reservations");

router.get("/", isLoggedIn, reservationsControllers.details);

router.get("/:id", reservationsControllers.index);

router.post("/:id", isLoggedIn, reservationsControllers.createReservation);

router.delete("/:reservationId", reservationsControllers.deleteReservation);

router.get("/:id/edit", reservationsControllers.editReservations);

router.put("/:id", reservationsControllers.update);

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/google");
}

module.exports = router;
