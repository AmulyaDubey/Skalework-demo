const db = require("../dbConfig");
const short = require("short-uuid");

exports.addCustomer = (req, res) => {
  const { name, email, address } = req.body;
  console.log(name, email, address);
  customerId = short.generate();
  db.query(
    "INSERT INTO customers SET ? ",
    {
      customerId,
      name,
      email,
      address,
    },
    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        return res.json({
          message: "New customer created",
        });
      }
    }
  );
};

exports.deleteCustomer = (req, res) => {
  const { customerId } = req.body;
  var query = "DELETE FROM customers WHERE customerId=?";
  db.query(query, [customerId], function (err, result) {
    if (err) throw err;
    console.log("Number of records deleted: " + result.affectedRows);
    return res.render("customer", {
      message: "Customer deleted",
    });
  });
};

exports.getCustomersArray = (req, res) => {
  const query = "SELECT name,customerId FROM customers";
  db.query(query, (error, result) => {
    if (error) {
      console.log(error);
    } else {
      return res.json({
        result,
      });
    }
  });
};

exports.getCustomerOrders = async (customerId) => {
  const query = `SELECT name as orderName, orderId FROM orders WHERE customerId=?`;
  return new Promise(function (resolve, reject) {
    db.query(query, [customerId], (error, result) => {
      if (error) {
        reject(new Error("Error!"));
      } else {
        resolve(JSON.parse(JSON.stringify(result)));
      }
    });
  });
};

exports.getCustomerDetails = (req, res) => {
  const { customerId } = req.params;
  const query = `SELECT * FROM customers WHERE customerId=?`;
  db.query(query, [customerId], async (error, result) => {
    if (error) {
      console.log(error);
    } else {
      result = result[0];
      result.orders = await this.getCustomerOrders(customerId);
      return res.json({
        result,
      });
    }
  });
};
