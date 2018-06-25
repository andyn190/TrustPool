const poolsRouter = require('./pools');
const signupRouter = require('./signup');


module.exports = (app) => {
  app.use('/pools', poolsRouter);
  app.use('/signup', signupRouter);
};