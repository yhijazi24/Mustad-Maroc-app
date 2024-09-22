const express = require("express");
const app = express();
const cors = require('cors');
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user")
const authRoute = require("./routes/auth")
const productRoute = require("./routes/product")
const cartRoute = require("./routes/cart")
const orderRoute = require("./routes/order")
const headerRoute = require("./routes/header")
const brandRoute = require("./routes/brand")
const productCardRoute = require("./routes/productCard")

dotenv.config();

app.use(cors());

mongoose.connect(process.env.MONGO_URL).then(() => console.log("DB Connection Successfull")).catch((err) => {
    console.log(err);
});

app.use(express.json());
app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/products", productRoute);
app.use("/cart", cartRoute);
app.use("/order", orderRoute);
app.use("/header", headerRoute);
app.use("/brands", brandRoute);
app.use("/product-card", productCardRoute);


app.listen(5000, () => {
    console.log("Backend server is running!");
});

