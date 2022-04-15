const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("customer");
});

router.get("/orders", (req, res) => {
  res.render("order");
});


module.exports= router