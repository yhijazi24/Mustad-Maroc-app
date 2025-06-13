const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const sequelize = require("./sequelize");

const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const headerRoute = require("./routes/header");
const brandRoute = require("./routes/brand");
const productCardRoute = require("./routes/productCard");

dotenv.config();

const app = express();

// ✅ Allow up to 10MB payloads
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

app.use(cors());

// ❌ Don't call express.json() again after bodyParser
// app.use(express.json()); ← REMOVE THIS LINE

// ✅ Database connection
sequelize.authenticate()
  .then(() => console.log("Connected to SQL Server"))
  .catch((err) => console.error("Connection error:", err));

sequelize.sync(); // Auto-creates tables if they don’t exist

// ✅ Routes
app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/products", productRoute);
app.use("/cart", cartRoute);
app.use("/order", orderRoute);
app.use("/header", headerRoute);
app.use("/brands", brandRoute);
app.use("/product-card", productCardRoute);

// ✅ Server listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}!`);
});
