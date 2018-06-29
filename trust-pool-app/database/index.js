const Sequelize = require('sequelize');
const { AWSDB, LOCALDB } = require('./config');

const sequelize = new Sequelize(LOCALDB || AWSDB);

const Users = sequelize.define('Users', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true
  },
  first_name: {
    type: Sequelize.CHAR(15),
    allowNull: true
  },
  last_name: {
    type: Sequelize.CHAR(15),
    allowNull: true
  },
  email: {
    type: Sequelize.CHAR,
    allowNull: true,
    unique: true
  },
  googleID: {
    type: Sequelize.CHAR,
    unique: true
  },
  image_url: {
    type: Sequelize.CHAR,
    allowNull: true
  },
  password: {
    type: Sequelize.CHAR,
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
  pool_value: {
    type: Sequelize.INTEGER
  },
  description: {
    type: Sequelize.TEXT
  },
  name: {
    type: Sequelize.CHAR,
    unique: true
  },
  imageURL: {
    type: Sequelize.TEXT
  },
  public: {
    type: Sequelize.CHAR
  },
  voteConfig: {
    type: Sequelize.INTEGER
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

Pools.belongsTo(Users, { foreignKey: 'creator' });

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
  pool_id: {
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
  active_status: {
    type: Sequelize.CHAR
  },
  voter_count: {
    type: Sequelize.INTEGER
  },
  expense_amount: {
    type: Sequelize.INTEGER
  },
  created_at: {
    type: Sequelize.DATE
  },
  expiration_date: {
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
  request_title: {
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

const ContributionEntry = sequelize.define('Contribution_Entry', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true
  },
  pool_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Pools,
      key: 'id',
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    }
  },
  pool_member_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Users,
      key: 'id',
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    }
  },
  contribution_amount: {
    type: Sequelize.INTEGER
  },
  time_stamp: {
    type: Sequelize.DATE
  }
});

const PoolMembers = sequelize.define('Pool_Members', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true
  },
  pool_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Pools,
      key: 'id',
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    }
  },
  pool_member_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Users,
      key: 'id',
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    }
  },
  contrubution_amount: {
    type: Sequelize.INTEGER
  },
  withdraw_amount: {
    type: Sequelize.INTEGER
  }
});

const ChatMessages = sequelize.define('Chat_Messages', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true
  },
  pool_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Pools,
      key: 'id',
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    }
  },
  user_id: {
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
  time_stamp: {
    type: Sequelize.DATE
  }
});

const EbayWishlistEntry = sequelize.define('Ebay_Wishlist_Entry', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true
  },
  ebay_item_id: {
    type: Sequelize.INTEGER
  },
  expense_request_type_id: {
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
  name: {
    type: Sequelize.CHAR
  },
  email: {
    type: Sequelize.CHAR
  },
  description: {
    type: Sequelize.TEXT
  },
  is_physical: {
    type: Sequelize.TEXT
  },
  physical_address: {
    type: Sequelize.TEXT
  },
  expense_request_type_id: {
    type: Sequelize.CHAR,
    references: {
      model: ExpenseRequestType,
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
  .catch((err) => {
    console.log(`unable to connect to the database: ${err}`);
  });

PoolMembers.sync({ force: true }).then(res => console.log(res)).catch(err => console.log(err));
// Pools.sync({ force: true }).then(res => console.log(res)).catch(err => console.log(err));

module.exports = {
  sequelize,
  Users,
  Pools,
  ExpenseRequestType,
  ExpenseRequest,
  ContributionEntry,
  PoolMembers,
  ChatMessages,
  EbayWishlistEntry,
  Checks
};
