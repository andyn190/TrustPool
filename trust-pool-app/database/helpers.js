const { sequelize,
  Users,
  Pools,
  ExpenseRequestType,
  ExpenseRequest,
  ContributionEntry,
  PoolMembers,
  ChatMessages,
  EbayWishlistEntry,
  Checks } = require('.');
  
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
  
  const findOne = ( model, where ) => {
    return new Promise((resolve, reject) => {
      models[model].find(where)
      .then((item) => {
        resolve(item);
      })
      .catch((err)=>{
        reject(err);
      });
    });
  };
  
  const findUserById = ( id ) => {
      return findOne('Users', { where: { id } });
  };

const findUserByGoogle = (googleID) => {
  return findOne('Users', { where: { googleID } });
};
  
  const findPoolByName = ( name ) => {
      return findOne('Pools', { where: { name } });
  };
  
  const findAll = ( model, where ) => {
    if(where) {
      return new Promise((resolve, reject) => {
        models[model].findAll(where)
        .then((item) => {
          resolve(item);
        })
        .catch((err)=>{
          reject(err);
        });
      }); 
    } else {
      return new Promise((resolve, reject) => {
        models[model].findAll()
        .then((item) => {
          resolve(item);
        })
        .catch((err)=>{
          reject(err);
        });
      }); 
    }
  };
  
  const findAllPools = () => {
      return findAll('Pools');
  };
const findAllPoolMembers = (pool_id) => {
  return findAll('PoolMembers', { where: { pool_id } });
};
  
  const findOrCreate = ( model, where ) => {
    return new Promise((resolve, reject) => {
      models[model].findOrCreate(where).spread((result, created) => {
      const item = result.get({
        plain: true
      });
      item.isNewRecord = result.isNewRecord;
      if(item){
        resolve(item);
      } else {
        reject();
      }
    });
    });
  };
  
  const findOrCreateUser = (email, first_name, last_name, image_url, password, googleID) => {
    if(email){
      return findOrCreate('Users', { where: {email}, defaults: {first_name, last_name, image_url, password } });
    } 
    if( googleID ) {
      return findOrCreate('Users', { where: { googleID }, defaults: {first_name, last_name, image_url, password , googleID} });
    } 
  };
  
  const create = (model, item) => {
    return models[model].create(item);
      User.create({ username: 'fnord', job: 'omnomnom' })
      return findOrCreate('Pools', { where: { name }, defaults: { imgUrl, desc, voteConfig, creator, public }});
  };
  
  const createPool = (name, imageURL, description, voteConfig, creator, public) => {
    const pool = { name, imageURL, description, voteConfig, creator, public, pool_value: 0, members_count: 0 };
    return create('Pools', pool);
  }

  const createPoolMember = (pool_id, pool_member_id) => {
    const contrubution_amount = 0, withdraw_amount = 0;
    const poolMember = { pool_id, pool_member_id, contrubution_amount, withdraw_amount  };
    return create('PoolMembers', poolMember);
  }
  
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
    findAllPoolMembers
  };
  
