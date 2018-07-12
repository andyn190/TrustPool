const Sequelize = require('sequelize');
// const people = require('./MOCK_DATA (2).json');
// const demoPools = require('./MOCK_DATA (3).json');
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
    type: Sequelize.STRING,
    allowNull: true
  },
  last_name: {
    type: Sequelize.STRING,
    allowNull: true
  },
  email: {
    type: Sequelize.STRING,
    allowNull: true,
    unique: true
  },
  googleID: {
    type: Sequelize.STRING,
    unique: true
  },
  image_url: {
    type: Sequelize.STRING,
    allowNull: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: true
  },
  photoID: {
    type: Sequelize.STRING,
    allowNull: true
  },
  admin: {
    type: Sequelize.STRING,
    allowNull: true
  },
  verified: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: 'false'
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
  publicOpt: {
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

const ExpenseRequestLink = sequelize.define('Expense_Request_Link', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true
  },
  method: {
    type: Sequelize.STRING
  }
});

const ChatRoom = sequelize.define('Chat_Rooms', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true
  },
  type: {
    type: Sequelize.STRING
  }
});

const ChatMessages = sequelize.define('Chat_Messages', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true
  },
  room_id: {
    type: Sequelize.INTEGER,
    references: {
      model: ChatRoom,
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
    type: Sequelize.STRING
  },
  userName: {
    type: Sequelize.STRING
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
    type: Sequelize.STRING
  },
  member_vote_percent: {
    type: Sequelize.INTEGER
  },
  voter_count: {
    type: Sequelize.INTEGER
  },
  vote_down: {
    type: Sequelize.INTEGER
  },
  vote_up: {
    type: Sequelize.INTEGER
  },
  expense_amount: {
    type: Sequelize.INTEGER
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
  chat_id: {
    type: Sequelize.INTEGER,
    references: {
      model: ChatRoom,
      key: 'id',
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    }
  },
  method: {
    type: Sequelize.INTEGER,
    references: {
      model: ExpenseRequestLink,
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
  is_creator: {
    type: Sequelize.CHAR
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
  },
  has_voted: {
    type: Sequelize.STRING
  },
  vote_power: {
    type: Sequelize.INTEGER
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
    type: Sequelize.INTEGER,
    references: {
      model: ExpenseRequestLink,
      key: 'id',
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    }
  }
});

const JoinRequests = sequelize.define('Join_Requests', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true
  },
  user_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Users,
      key: 'id',
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    }
  },
  pool_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Pools,
      key: 'id',
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    }
  },
  name: {
    type: Sequelize.STRING
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
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.STRING
  },
  physical_address: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  link_id: {
    type: Sequelize.INTEGER,
    references: {
      model: ExpenseRequestLink,
      key: 'id',
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    }
  }
});


sequelize
  .authenticate()
  .then(() => {
    console.log('connection has been established');
    // Users.bulkCreate(people)
    //   .then((users) => {
    //     console.log(users);
    //   }).catch(err => console.log(err));
    // Pools.bulkCreate(demoPools)
    //   .then((pools) => {
    //     console.log(pools);
    //   }).catch(err => console.log(err));
  })
  .catch((err) => {
    console.log(`unable to connect to the database: ${err}`);
  });

// PoolMembers.sync({ force: true }).then(res => console.log(res)).catch(err => console.log(err));
// Pools.sync({ force: true }).then(res => console.log(res)).catch(err => console.log(err));
sequelize.sync({ force: true }).then(res => console.log(res)).catch(err => console.log(err));
// ContributionEntry.sync({ force: true })
//  .then(res => console.log(res)).catch(err => console.log(err));
// JoinRequests.sync({ force: true }).then(res => console.log(res)).catch(err => console.log(err));
// ExpenseRequestLink.sync({ force: true }).then(res => console.log(res))
// .catch(err => console.log(err));
// ExpenseRequest.sync({ force: true }).then(res => console.log(res))
// .catch(err => console.log(err));
// Checks.sync({ force: true }).then(res => console.log(res)).catch(err => console.log(err));

module.exports = {
  sequelize,
  Users,
  Pools,
  ExpenseRequestLink,
  ExpenseRequest,
  ContributionEntry,
  PoolMembers,
  ChatMessages,
  EbayWishlistEntry,
  Checks,
  JoinRequests,
  ChatRoom
};
