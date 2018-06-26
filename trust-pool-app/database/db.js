const pg = require('pg');
const Sequelize = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();
const { AWSPASSWORD } = process.env;

const connectionString = `postgres://andyn190:${AWSPASSWORD}@trustpooldb.cqz6ljdkuhix.us-east-2.rds.amazonaws.com:5432/trustpooldb`

const sequelize = new Sequelize(connectionString);

const Users = sequelize.define('Users', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true
  },
  "first_name": {
    type: Sequelize.CHAR
  },
  "last_name": {
    type: Sequelize.CHAR
  },
  email: {
    type: Sequelize.CHAR
  },
  "image_url": {
    type: Sequelize.CHAR
  }
});

const Pools = sequelize.define('Pools', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true
  },
  "pool_value": {
    type: Sequelize.INTEGER
  },
  description: {
    type: Sequelize.TEXT
  },
  name: {
    type: Sequelize.CHAR
  },
  imageURL: {
    type: Sequelize.TEXT
  }, 
  public: {
    type: Sequelize.CHAR
  },
  created_at: {
    type: Sequelize.DATE
  },
  "members_count": {
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

const Expense_request_type = sequelize.define('expense_request_type', {
  id: {
    type: Sequelize.CHAR,
    primaryKey: true,
    autoIncrement: true,
    unique: true
  }
});

const Expense_request = sequelize.define('Expense_request', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true
  },
  "pool_id": {
    type: Sequelize.INTEGER,
    references: {
      model: Pools,
      key: 'id',
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    }
  },
  description: {
    type: Sequelize.TEXT
  },
  "active_status": {
    type: Sequelize.CHAR
  },
  "voter_count": {
    type: Sequelize.INTEGER
  },
  "expense_amount": {
    type: Sequelize.INTEGER
  },
  "created_at": {
    type: Sequelize.DATE
  },
  "expiration_date": {
    type: Sequelize.DATE
  },
  creator: {
    type: Sequelize.INTEGER,
    references: {
      model: Users,
      key: 'id',
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    }
  },
  "request_title": {
    type: Sequelize.TEXT
  },
  method: {
    type: Sequelize.CHAR,
    references: {
      model: Expense_request_type,
      key: 'id',
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    }
  }
});

const Contribution_entry = sequelize.define('contribution_entry', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true
  },
  "pool_id": {
    type: Sequelize.INTEGER,
    references: {
      model: Pools,
      key: 'id',
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    }
  },
  "pool_member_id": {
    type: Sequelize.INTEGER,
    references: {
      model: Users,
      key: 'id',
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    }
  },
  "contribution_amount": {
    type: Sequelize.INTEGER
  },
  "time_stamp": {
    type: Sequelize.DATE
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
