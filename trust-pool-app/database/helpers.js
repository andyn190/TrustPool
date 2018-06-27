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
}

const findOrCreate = ( model, where ) => {
  return new Promise((resolve, reject) => {
    models[model].findOrCreate(where).spread((result, created) => {
    const item = result.get({
      plain: true
    });
    console.log(item);
    if(item){
      resolve(item);
    } else {
      reject();
    }
    console.log(created)
  });
  });
}

const findOrCreateUser = (email, first_name, last_name, image_url, password) => {
  return findOrCreate('Users', { where: {email}, defaults: {first_name, last_name, image_url, password } });
};
