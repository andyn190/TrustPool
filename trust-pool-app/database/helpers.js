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

const findOrCreate = ( model, where ) => {
  return new Promise((resolve, reject) => {
    models[model].findOrCreate(where).spread((result, created) => {
    const item = result.get({
      plain: true
    });
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

const findOrCreatePool = (name, imgUrl, desc, voteConfig, creator, public) => {
    return findOrCreate('Pools', { where: { name }, defaults: { imgUrl, desc, voteConfig, creator, public }});
};

module.exports = {
  findOrCreate,
  findOrCreateUser,
  findOne,
  findUserById,
  findOrCreatePool,
};