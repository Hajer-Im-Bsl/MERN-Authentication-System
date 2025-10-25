const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv").config();
const cors = require("cors");
const port = process.env.PORT || 5001;
const connect_DB = require("./connectDB/connectDB");
const UserRoutes = require("./Routes/User Routes/UserRoutes");

//! init the server
const app = express();

//! middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
//! api routes
app.use("/api/v1/user", UserRoutes);

//! launching server
app.listen(port, async () => {
  await connect_DB();
  console.log("Server running on port", port);
});
