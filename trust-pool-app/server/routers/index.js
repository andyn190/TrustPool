const poolsRouter = require('./pools');
const signupRouter = require('./signup');
const loginRouter = require('./login');

module.exports = (app) => {
  app.use('/pools', poolsRouter);
  app.use('/signup', signupRouter);
  app.use('/login', loginRouter);
};