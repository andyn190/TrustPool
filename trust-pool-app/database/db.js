const pg = require('pg');
const Sequelize = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();
const { AWSPASSWORD, AWSUSER } = process.env;

const connectionString = `postgres://${AWSUSER}:${AWSPASSWORD}@trustpooldb.cf3jswth6a7j.us-east-2.rds.amazonaws.com:5432/trustpooldb`

const sequelize = new Sequelize(connectionString);

const Users = sequelize.define('Users', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true
  },
  "first_name": {
    type: Sequelize.CHAR(15),
    allowNull: true
  },
  "last_name": {
    type: Sequelize.CHAR(15),
    allowNull: true
  },
  email: {
    type: Sequelize.CHAR(30),
    allowNull: true
  },
  "image_url": {
    type: Sequelize.CHAR,
    allowNull: true
  },
  password: {
    type: Sequelize.CHAR(50),
    allowNull: true
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

const Pool_members = sequelize.define('pool_members', {
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
  "contrubution_amount": {
    type: Sequelize.INTEGER
  },
  "withdraw_amount": {
    type: Sequelize.INTEGER
  },
  "join_date": {
    type: Sequelize.DATE
  }
});

const Chat_messages = sequelize.define('chat_messages', {
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
  "user_id": {
    type: Sequelize.INTEGER,
    references: {
      model: Users,
      key: 'id',
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    }
  },
  message: {
    type: Sequelize.TEXT
  },
  "time_stamp": {
    type: Sequelize.DATE
  }
});

const Ebay_wishlist_entry = sequelize.define('ebay_wishlist_entry', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true
  },
  "ebay_item_id": {
    type: Sequelize.INTEGER
  },
  "expense_request_type_id": {
    type: Sequelize.CHAR,
    references: {
      model: Expense_request_type,
      key: 'id',
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    }
  }
});

const Checks = sequelize.define('checks', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true
  },
  amount: {
    type: Sequelize.INTEGER
  },
  "name": {
    type: Sequelize.CHAR
  },
  email: {
    type: Sequelize.CHAR
  },
  description: {
    type: Sequelize.TEXT
  },
  "is_physical": {
    type: Sequelize.TEXT
  },
  "physical_address": {
    type: Sequelize.TEXT
  },
  "expense_request_type_id": {
    type: Sequelize.CHAR,
    references: {
      model: Expense_request_type,
      key: 'id',
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    }
  }
});

// Users.sync({ force: true }).then(() => {
//   Users.create({
//     first_name: 'Andy',
//     last_name: 'Nguyen',
//     password: 'funkybunch'
//   })
// });

// Users.findAll().then(users => {
//   console.log(users);
// }).catch((error) => {
//   console.log(error);
// })
sequelize
.authenticate()
.then(() => {
  console.log('connection has been established');
})
.catch(err => {
  console.error('unable to connect to the database:');
})
// working