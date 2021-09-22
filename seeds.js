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

    standard: "https://i.imgur.com/8HQdZVi.jpg",

    deluxe: "https://i.imgur.com/gP1izNX.jpg",

    suite: "https://i.imgur.com/EJif73F.jpg",
  },

  {
    name: "Keemala Resort",

    image: "https://i.imgur.com/V6HNgVb.jpg",

    details:
      "Aliquam interdum eros eget nisi eleifend, sit amet faucibus nibh ullamcorper.",

    location: "Thailand",

    standard: "https://i.imgur.com/JQixSEH.jpg",

    deluxe: "https://i.imgur.com/f0lmqFF.jpg",

    suite: "https://i.imgur.com/iPgjvrm.jpg",
  },

  {
    name: "Tsara Komba",

    image: "https://i.imgur.com/sR8Cs7O.jpg",

    details:
      "Suspendisse id augue eu augue cursus venenatis in quis magna. Mauris.",

    location: "Madagascar",

    standard: "https://i.imgur.com/Xw2XkoS.jpg",

    deluxe: "https://i.imgur.com/BB3IKua.jpg",

    suite: "https://i.imgur.com/8wpYnAY.jpg",
  },

  {
    name: "The Muraka",

    image: "https://i.imgur.com/QG0LkIJ.jpg",

    details:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer pulvinar, velit.",

    location: "Maldives",

    standard: "https://i.imgur.com/9qEVOCq.jpg",

    deluxe: "https://i.imgur.com/5TwjNNs.jpg",

    suite: "https://i.imgur.com/bjFPpZ7.jpg",
  },

  {
    name: "Ice Hotel",

    image: "https://i.imgur.com/LU3kket.jpg",

    details: "Mauris sit amet mattis erat. Donec luctus orci est ac lacinia",

    location: "Sweden",

    standard: "https://i.imgur.com/GcCTTkQ.jpg",

    deluxe: "https://i.imgur.com/LRoFL8O.jpg",

    suite: "https://i.imgur.com/7CzizA9.jpg",
  },

  {
    name: "Hobbiton",

    image: "https://i.imgur.com/wgFPeWX.jpg",

    details:
      "Nulla hendrerit metus vel massa semper commodo. Praesent eget magna felis.",

    location: "New Zealand",

    standard: "https://i.imgur.com/1ZcupdA.jpg",

    deluxe: "https://i.imgur.com/oovWk7S.jpg",

    suite: "https://i.imgur.com/HSriRGI.jpg",
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
