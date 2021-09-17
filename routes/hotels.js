var express = require("express");
var router = express.Router();

const hotelsControllers = require("../controllers/hotels");

router.get("/", isLoggedIn, hotelsControllers.index);

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/google");
}

module.exports = router;
