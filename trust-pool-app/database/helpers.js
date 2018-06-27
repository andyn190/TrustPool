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
  models[model].findOrCreate(where).spread((user, created) => {
    console.log(user.get({
      plain: true
    }))
    console.log(created)
  })
}