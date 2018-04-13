import Controllers from '../Controller';

const userController = Controllers.Users;

const routes = (app) => {
  app.get('/api/v1/', (req, res) => {
    res.status(200).send({ message: 'Welcome to the backend test' });
  });
  app.post('/api/v1/signup', userController.signUp);
  app.post('api/v1/signin', userController.signIn);
};

export default routes;
