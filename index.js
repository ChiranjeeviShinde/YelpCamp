const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");

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
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  res.render("camps/home");
});

app.get("/camps", async (req, res) => {
  const camps = await Camp.find({});
  res.render("camps/index", { camps });
});

app.get("/camps/new", (req, res) => {
  res.render("camps/new");
});

app.get("/camps/signin", (req, res) => {
  res.render("camps/auth");
});

app.get("/camps/:id", async (req, res) => {
  const { id } = req.params;
  const camp = await Camp.findById(id);
  res.render("camps/show", { camp });
});

app.post("/camps", async (req, res) => {
  const newCamp = new Camp(req.body);
  newCamp.reviews = [];
  await newCamp.save();
  console.log(newCamp);
  res.redirect(`/camps/${newCamp._id}`);
});

app.get("/camps/:id/edit", async (req, res) => {
  const { id } = req.params;
  const camp = await Camp.findById(id);
  res.render("camps/edit", { camp });
});

app.put("/camps/:id", async (req, res) => {
  const { id } = req.params;
  const camp = await Camp.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });
  res.redirect(`/camps/${camp._id}`);
});

app.delete("/camps/:id", async (req, res) => {
  const { id } = req.params;
  const deletedCamp = await Camp.findByIdAndDelete(id);
  res.redirect("/camps");
});

app.post("/camps/:id", async (req, res) => {
  const { id } = req.params;
  const camp = await Camp.findById(id);
  camp.reviews.push(req.body);
  await camp.save();
  res.render("camps/show", { camp });
});

app.delete("/camps/:id/review/:rid", async (req, res) => {
  const { id, rid } = req.params;
  const camp = await Camp.findById(id);
  await Camp.findByIdAndUpdate(
    id,
    { $pull: { reviews: { _id: rid } } },
    { new: true }
  );
  res.redirect(`/camps/${camp.id}`);
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
