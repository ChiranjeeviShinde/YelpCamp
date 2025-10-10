const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  review: String,
}, {_id: true});

const campSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  reviews: [reviewSchema],
});

const Camp = mongoose.model("Camp", campSchema);

module.exports = Camp;