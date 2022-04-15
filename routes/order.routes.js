const express = require("express");
const orderController= require('../controllers/order.controller')

const router = express.Router();

router.post("/create-order", orderController.createOrder);
router.get("/get-all-orders", orderController.getAllOrders);

module.exports= router