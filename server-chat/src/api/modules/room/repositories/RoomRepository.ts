import Room from '@modules/room/schemas/Room';
import { Model } from 'mongoose';

import IRoom from '../schemas/interfaces/IRoom';
import IRoomRepository from './interfaces/IRoomRepository';

class RoomRepository implements IRoomRepository {
  private ormRepository: Model<IRoom>;

  constructor() {
    this.ormRepository = Room;
  }

  public async findById(id: string): Promise<IRoom> {
    const result = await this.ormRepository.findById(id);

    return result;
  }

  public async create(room: IRoom): Promise<void> {
    await this.ormRepository.create(room);
  }

  public async update(room: IRoom, id: string): Promise<IRoom> {
    const result = await this.ormRepository.findByIdAndUpdate(id, room);
    return result;
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.findByIdAndDelete(id);
  }
}

export default RoomRepository;
