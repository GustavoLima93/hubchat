import ensureAuthenticated from '@middlewares/ensureAuthenticated';
import { Router } from 'express';

import RoomController from '../controllers/RoomController';

const roomController = new RoomController();
const roomRouter = Router();

roomRouter
  .get('/', ensureAuthenticated, roomController.find)
  .get('/:id', ensureAuthenticated, roomController.finById)
  .post('/', ensureAuthenticated, roomController.create)
  .put('/:id', ensureAuthenticated, roomController.update)
  .delete('/:id', ensureAuthenticated, roomController.delete);

export default roomRouter;
