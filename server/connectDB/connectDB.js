const doten = require("dotenv").config();
const mongoose = require("mongoose");
const connect_DB = () => {
  return mongoose
    .connect(process.env.DB_connection_url)
    .then(() => {
      console.log("DB connected successfully");
    })
    .catch((e) => {
      console.log(e);
    });
};
module.exports = connect_DB;
