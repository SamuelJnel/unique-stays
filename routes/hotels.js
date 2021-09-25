var express = require("express");
var router = express.Router();

const hotelsControllers = require("../controllers/hotels");

router.get("/", hotelsControllers.index);

module.exports = router;
