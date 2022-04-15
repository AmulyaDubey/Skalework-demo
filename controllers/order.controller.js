const db = require("../dbConfig");
const short = require("short-uuid");

exports.createOrder = (req, res) => {
  const { name, customerId } = req.body;
  orderId = short.generate();
  db.query(
    "INSERT INTO orders SET ? ",
    {
      orderId,
      name,
      customerId,
    },
    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        return res.render("order", {
          message: "New order created",
        });
      }
    }
  );
};

exports.getAllOrders=(req, res)=>{
  const query = "SELECT name,orderId FROM orders";
  db.query(query, (error, result) => {
    if (error) {
      console.log(error);
    } else {
      return res.json({
        result,
      });
    }
  });
}

