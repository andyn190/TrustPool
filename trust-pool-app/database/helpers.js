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

findOrCreate('Users', { where: {email: 'jhankins02@gmail.com'}, defaults: {'first_name': 'jelani', 'last_name': 'hankins', 'image_url': 'https://lh6.googleusercontent.com/-xVfxeB5daxA/AAAAAAAAAAI/AAAAAAAAAkc/sHx0_aCUNnU/photo.jpg?sz=50', password: 'password' } })
.then((user) => {console.log(user)})
.catch((err) => { console.log(err);});

