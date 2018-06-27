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
  password: {
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

const ExpenseRequestType = sequelize.define('Expense_Request_Type', {
  id: {
    type: Sequelize.CHAR,
    primaryKey: true,
    autoIncrement: true,
    unique: true
  }
});

const ExpenseRequest = sequelize.define('Expense_Request', {
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
      model: ExpenseRequestType,
      key: 'id',
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    }
  }
});

const Contribution_Entry = sequelize.define('Contribution_Entry', {
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

const Pool_Members = sequelize.define('Pool_Members', {
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

const Chat_Messages = sequelize.define('Chat_Messages', {
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

const Ebay_Wishlist_Entry = sequelize.define('Ebay_Wishlist_Entry', {
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
      model: ExpenseRequestType,
      key: 'id',
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    }
  }
});

const Checks = sequelize.define('Checks', {
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
      model: ExpenseRequestType,
      key: 'id',
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    }
  }
})

sequelize
.authenticate()
.then(() => {
  console.log('connection has been established');
})
.catch(err => {
  console.error('unable to connect to the database:');
})

exports = sequelize;
