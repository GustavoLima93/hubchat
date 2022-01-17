import AppError from '@middlewares/error/AppError';
import { inject, injectable } from 'tsyringe';

import IRoomRepository from '../repositories/interfaces/IRoomRepository';
import IRoom from '../schemas/interfaces/IRoom';

@injectable()
class RoomService {
  constructor(
    @inject('RoomRepository')
    private roomRepository: IRoomRepository,
  ) {}

  public async findById(id: string): Promise<IRoom> {
    const result = await this.roomRepository.findById(id);

    return result;
  }

  public async create(room: IRoom): Promise<void> {
    await this.roomRepository.create(room);
  }

  public async update(
    { name, owner, users }: IRoom,
    id: string,
  ): Promise<void> {
    const room = await this.roomRepository.findById(id);

    if (!room) {
      throw new AppError('Room not found', 404);
    }

    if (String(room.owner) !== String(owner)) {
      throw new AppError('Not authorized', 401);
    }

    const roomUpdate = {
      ...(owner && { owner }),
      ...(name && { name }),
      ...(users && { users }),
    };

    await this.roomRepository.update(roomUpdate, id);
  }

  public async delete(id: string, owner: string): Promise<void> {
    const room = await this.roomRepository.findById(id);

    if (!room) {
      throw new AppError('Room not found', 404);
    }

    if (String(room.owner) !== owner) {
      throw new AppError('Not authorized', 401);
    }

    await this.roomRepository.delete(id);
  }
}

export default RoomService;
