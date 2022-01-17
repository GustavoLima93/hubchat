import ensureAuthenticated from '@middlewares/ensureAuthenticated';
import { Router } from 'express';

import RoomDialogController from '../controllers/RoomDialogController';

const roomDialogController = new RoomDialogController();
const roomDialogRouter = Router();

roomDialogRouter
  .get('/', ensureAuthenticated, roomDialogController.find)
  .post('/', ensureAuthenticated, roomDialogController.create);

export default roomDialogRouter;
