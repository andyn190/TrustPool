const dotenv = require('dotenv');

dotenv.config();
const { AWSPASSWORD, AWSUSER, LOCALDB } = process.env;

module.exports = {
  AWSDB: `postgres://${AWSUSER}:${AWSPASSWORD}@trustpooldb.cf3jswth6a7j.us-east-2.rds.amazonaws.com:5432/trustpooldb`,
  LOCALDB: 'postgres://localhost:5432/postgres',
};
