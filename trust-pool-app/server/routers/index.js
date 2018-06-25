const poolsRouter = require('./pools');


module.exports = (app) => {
  app.use('/pools', poolsRouter);
};