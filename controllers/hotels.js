const Hotel = require("../models/hotel");
const Guest = require("../models/guest");

module.exports = {
  index,
};

function index(req, res) {
  Hotel.find({}, function (err, hotels) {
    res.render("hotels/index", { hotels });
  });
}
