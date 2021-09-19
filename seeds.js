require("dotenv").config();
require("./config/database");

const Hotel = require("./models/hotel");

const hotels = [
  {
    name: "Arctic Resort",

    image: "https://i.imgur.com/2LT0LRQ.jpg",

    details:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ornare quis odio non placerat. Aenean.",

    location: "Finland",
  },

  {
    name: "Keemala Resort",

    image: "https://i.imgur.com/V6HNgVb.jpg",

    details:
      "Aliquam interdum eros eget nisi eleifend, sit amet faucibus nibh ullamcorper.",

    location: "Thailand",
  },

  {
    name: "Tsara Komba",

    image: "https://i.imgur.com/sR8Cs7O.jpg",

    details:
      "Suspendisse id augue eu augue cursus venenatis in quis magna. Mauris.",

    location: "Madagascar",
  },

  {
    name: "The Muraka",

    image: "https://i.imgur.com/QG0LkIJ.jpg",

    details:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer pulvinar, velit.",

    location: "Maldives",
  },

  {
    name: "Ice Hotel",

    image: "https://i.imgur.com/LU3kket.jpg",

    details: "Mauris sit amet mattis erat. Donec luctus orci est ac lacinia",

    location: "Sweden",
  },

  {
    name: "Hobbiton",

    image: "https://i.imgur.com/wgFPeWX.jpg",

    details:
      "Nulla hendrerit metus vel massa semper commodo. Praesent eget magna felis.",

    location: "New Zealand",
  },
];

Hotel.deleteMany({})
  .then((results) => {
    return Hotel.create(hotels);
  })
  .then((res) => {
    console.log(res.length);
    process.exit();
  })
  .catch((err) => {
    console.log(err);
  });
