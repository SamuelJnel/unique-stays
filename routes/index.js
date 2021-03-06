var express = require("express");
var router = express.Router();

const passport = require("passport");

router.get("/", function (req, res) {
  res.render("index");
});

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/oauth2callback",
  passport.authenticate("google", {
    successRedirect: "/hotels",
    failureRedirect: "/",
  })
);

router.get("/Logout", function (req, res) {
  req.logout();
  res.redirect("/hotels");
});

module.exports = router;
