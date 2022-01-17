import ensureAuthenticated from '@middlewares/ensureAuthenticated';
import { Router } from 'express';

import UserController from '../controllers/UserController';

const userController = new UserController();
const userRouter = Router();

userRouter
  .get('/', ensureAuthenticated, userController.finById)
  .post('/', userController.create)
  .put('/', ensureAuthenticated, userController.update)
  .delete('/', ensureAuthenticated, userController.delete);

export default userRouter;
