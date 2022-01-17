import RoomService from '@modules/room/services/RoomService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import IRoom from '../schemas/interfaces/IRoom';

export default class RoomController {
  public async finById(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const roomService = container.resolve(RoomService);

    const room = await roomService.findById(id);

    return response.json(room);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const form = request.body;

    const room: IRoom = { ...form, owner: request.user.id };

    const roomService = container.resolve(RoomService);

    await roomService.create(room);

    return response.sendStatus(201);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const form = request.body;

    const room: IRoom = { ...form, owner: request.user.id };

    const roomService = container.resolve(RoomService);

    await roomService.update(room, id);

    return response.send();
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const roomService = container.resolve(RoomService);

    await roomService.delete(id, request.user.id);

    return response.send();
  }
}
