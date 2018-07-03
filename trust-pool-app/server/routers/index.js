const poolsRouter = require('./pools');
const signupRouter = require('./signup');
const loginRouter = require('./login');
const logoutRouter = require('./logout');
const userRouter = require('./user');
const api = require('./api');

module.exports = (app) => {
  app.use('/pools', poolsRouter);
  app.use('/signup', signupRouter);
  app.use('/login', loginRouter);
  app.use('/logout', logoutRouter);
  app.use('/user', userRouter);
  app.use('/api', api);
};
