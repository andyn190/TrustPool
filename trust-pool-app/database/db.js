const pg = require('pg');
const Sequelize = require('sequelize');
const config = require('./../../config.json');

const connectionString = `postgres://andyn190:${config.AWSPASSWORD}@trustpooldb.cqz6ljdkuhix.us-east-2.rds.amazonaws.com:5432/trustpooldb`

const sequelize = new Sequelize(connectionString);

sequelize
.authenticate()
.then(() => {
  console.log('connection has been established');
})
.catch(err => {
  console.error('unable to connect to the database:');
})
