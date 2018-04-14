import Controllers from '../Controller';
import auth from '../Middleware/jwt';

const userController = Controllers.Users;

const routes = (app) => {
  app.get('/api/v1/', (req, res) => {
    res.status(200).send({ message: 'Welcome to the backend task' });
  });
  app.post('/api/v1/signup', userController.signUp);
  app.post('/api/v1/signin', userController.signIn);
  app.get('/api/v1/users/list', auth.checkToken, userController.list);
  app.patch('/api/v1/update', auth.checkToken, userController.applyPatch);
  app.post('/api/v1/resizeImage', auth.checkToken, userController.createThumbnail);
};

export default routes;
