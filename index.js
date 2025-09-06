const express = require("express");
const app = express();
const path = require("path");
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


app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.get("/camps/home", (req, res) => {
  res.render("camps/home");
});

app.get("/camps", async (req, res) => {
  const camps = await Camp.find({});
  res.render("camps/index", { camps });
});

app.get("/camps/new", (req, res) => {
  res.render("camps/new");
});

app.get('/camps/:id', async (req, res) => {
    const { id } = req.params;
    const camp = await Camp.findById(id)
    res.render('camps/show', { camp })
})

app.post('/camps', async (req, res) => {
    const newCamp = new Camp(req.body);
    await newCamp.save();
    res.redirect(`/camps/${newCamp._id}`)
})

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
