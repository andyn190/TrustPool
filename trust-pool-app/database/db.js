const pg = require('pg');
const Sequelize = require('sequelize');
const config = require('./../../config.json');

const connectionString = `postgres://andyn190:${config.AWSPASSWORD}@trustpooldb.cqz6ljdkuhix.us-east-2.rds.amazonaws.com:5432/trustpooldb`

const sequelize = new Sequelize(connectionString);

const Users = sequelize.define('Users', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  first_name: {
    type: Sequelize.STRING
  },
  last_name: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  image_url: {
    type: Sequelize.STRING
  }
});

const Pools = sequelize.define('Pools', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  pool_value: {
    type: Sequelize.INTEGER
  },
  description: {
    type: Sequelize.TEXT
  },
  name: {
    type: Sequelize.STRING
  },
  imageURL: {
    type: Sequelize.STRING
  }, 
  public: {
    type: Sequelize.STRING
  },
  created_at: {
    type: Sequelize.DATE
  },
  members_count: {
    type: Sequelize.INTEGER
  },
  creator: {
    type: Sequelize.INTEGER,
    references: {
      model: Users,
      key: 'id',
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    }
  }
});


sequelize
.authenticate()
.then(() => {
  console.log('connection has been established');
})
.catch(err => {
  console.error('unable to connect to the database:');
})
