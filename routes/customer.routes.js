const express = require("express");
const customerController = require("../controllers/customer.controller");

const router = express.Router();

router.post("/add-customer", customerController.addCustomer);
router.delete("/delete-customer", customerController.deleteCustomer);
router.get("/get-customer-list", customerController.getCustomersArray);
router.get(
  "/get-customer/:customerId",
  customerController.getCustomerDetails
);

module.exports = router;
