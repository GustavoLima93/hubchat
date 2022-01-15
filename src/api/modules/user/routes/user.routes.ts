import ensureAuthenticated from '@middlewares/ensureAuthenticated';
import { Router } from 'express';

import UserController from '../controllers/UserController';

const userController = new UserController();
const userRouter = Router();

userRouter.get('/', ensureAuthenticated, userController.finById);
userRouter.post('/', userController.create);
userRouter.put('/', ensureAuthenticated, userController.update);
userRouter.delete('/', ensureAuthenticated, userController.delete);

export default userRouter;
