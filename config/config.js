require("dotenv").config();
module.exports = {
  mongoUrl: process.env.Mongo_url,
  jwtSecret: process.env.Secret_key,
};
