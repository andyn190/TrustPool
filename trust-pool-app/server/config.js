// this file will define variables for the server to use from the proccess enviroment
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  PORT: process.env.PORT || 8080,
};