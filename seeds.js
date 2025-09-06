const mongoose = require("mongoose");
const Camp = require("./models/camp");

mongoose
  .connect("mongodb://127.0.0.1:27017/YelpCamp")
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log("MongoDB connection error:", err);
  });

// const c = new Camp({
//   name: "Granite Hill",
//   price: 8.99,
//   description:
//     "This is a huge granite hill, no bathrooms. No water. Beautiful granite!",
//   location: "California, USA",
// });

// c.save().then((camp) => {
//   console.log(camp);
// }).catch((err) => {
//     console.log("Error saving camp:", err);
// });

Camp.insertMany([
  {
    name: "Salmon Creek",
    price: 7.99,
    description: "Beautiful creek with plenty of salmon.",
    location: "Oregon, USA",
  },
  {
    name: "Mountain Goat's Rest",
    price: 9.99,
    description: "Beautiful mountain with goats.",
    location: "Montana, USA",
  },
  {
    name: "Ocean Breeze",
    price: 10.99,
    description: "Camp with a beautiful ocean view.",
    location: "Florida, USA",
  },
  {
    name: "Pine Forest",
    price: 6.99,
    description: "Camp surrounded by tall pine trees.",
    location: "Colorado, USA",
  }
])
  .then((res) => {
    console.log("Camps inserted:", res);
  })
  .catch((err) => {
    console.log("Error inserting camps:", err);
  });
