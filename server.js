const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cookieParser= require("cookie-parser")

const app = express(); //start the express server


dotenv.config({ path: "./.env" });
const db= require('./dbConfig')

const customerRoutes = require("./routes/customer.routes");
const orderRoutes = require("./routes/order.routes");
const pages= require('./routes/pages')

const publicDirectory = path.join(__dirname, "./public");
app.set("view engine", "hbs");
app.use(express.static(publicDirectory)); // so that express uses the static files (css or js files)
app.use(express.urlencoded({ extended: false })); //Parse URL encoded body as sent by html form
app.use(express.json()) //Parse JSON bodies(as sent by api client)
app.use(cookieParser())

db.connect((err) => {
  if (err) console.log(err);
  else console.log("MySQL connected!");
});

app.use("/", pages);
app.use("/", customerRoutes);
app.use("/", orderRoutes);

app.listen(5000, () => {
  console.log("Express server started on port 5000");
});
