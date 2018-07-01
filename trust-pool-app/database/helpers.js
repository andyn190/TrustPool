const {
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
} = require('.');

const models = {
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

const findOne = (model, where) => new Promise((resolve, reject) => {
  models[model].find(where)
    .then((item) => {
      resolve(item);
    })
    .catch((err) => {
      reject(err);
    });
});


const findUserById = id => findOne('Users', { where: { id } });

const findUserByGoogle = googleID => findOne('Users', { where: { googleID } });

const isMember = (pool_member_id, pool_id) => findOne('PoolMembers', { where: { pool_member_id, pool_id } });


const findPoolByName = name => findOne('Pools', { where: { name } });

const findPoolById = id => findOne('Pools', { where: { id } });

const findAll = (model, where) => {
  if (where) {
    return new Promise((resolve, reject) => {
      models[model].findAll(where)
        .then((item) => {
          resolve(item);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  return new Promise((resolve, reject) => {
    models[model].findAll()
      .then((item) => {
        resolve(item);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const findAllPools = () => findAll('Pools');

const findAllUsers = () => findAll('Users');

const findAllPoolMembers = pool_id => findAll('PoolMembers', { where: { pool_id } });

const findOrCreate = (model, where) => new Promise((resolve, reject) => {
  models[model].findOrCreate(where).spread((result, created) => {
    const item = result.get({
      plain: true
    });
    item.isNewRecord = result.isNewRecord;
    if (item) {
      resolve(item);
    } else {
      reject();
    }
  });
});


const findOrCreateUser = (email, first_name, last_name, image_url, password, googleID) => {
  if (email) {
    return findOrCreate('Users', {
      where: { email },
      defaults: {
        first_name,
        last_name,
        image_url,
        password
      }
    });
  }
  if (googleID) {
    return findOrCreate('Users', {
      where: { googleID },
      defaults: {
        first_name,
        last_name,
        image_url,
        password,
        googleID
      }
    });
  }
  return 'NO EMAIL OR GOOGLE ID';
};

const create = (model, item) => models[model].create(item);


const createContribution = (pool_id, pool_member_id, contribution_amount) => {
  const contribution = { pool_id, pool_member_id, contribution_amount };
  // update pool value
  // update poolmember contribution amount
  return create('ContributionEntry', contribution);
};

const createPoolMember = (pool_id, pool_member_id) => {
  const contrubution_amount = 0;
  const withdraw_amount = 0;
  const poolMember = {
    pool_id,
    pool_member_id,
    contrubution_amount,
    withdraw_amount
  };
  return create('PoolMembers', poolMember);
};

const createPool = (name, imageURL, description, voteConfig, creator, publicOpt) => {
  const pool = {
    name,
    imageURL,
    description,
    voteConfig,
    creator,
    public: publicOpt,
    pool_value: 0,
    members_count: 0
  };

  return create('Pools', pool)
    .then((newPool) => {
      const { id } = newPool;
      return createPoolMember(id, creator)
        .then((poolmember) => { return { poolmember, newPool }; });
    });
};

const updatePool = (id, key, value) => {
  findPoolById(id)
    .then((pool) => {
      pool[key] = value;
      pool.save()
        .then(update => console.log(`POOL ${id} ${key} UPDATED ${value}!!`))
        .catch(err => console.log('POOL MEMBERS COUNT NOT UPDATED', err));
    })
    .catch(err => console.log('FAILED TO FIND POOL BY ID', err));
};

module.exports = {
  findOrCreate,
  findOrCreateUser,
  findOne,
  findUserById,
  create,
  createPool,
  findPoolByName,
  findAllPools,
  findAll,
  createPoolMember,
  findUserByGoogle,
  findAllPoolMembers,
  updatePool,
  findPoolById,
  isMember,
  createContribution,
  findAllUsers
};
