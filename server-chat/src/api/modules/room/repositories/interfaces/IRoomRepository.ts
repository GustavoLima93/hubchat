import IRoom from '@modules/room/schemas/interfaces/IRoom';

export default interface IRoomRepository {
  findById(id: string): Promise<IRoom>;
  create(room: IRoom): Promise<void>;
  update(room: IRoom, id: string): Promise<IRoom>;
  delete(id: string): Promise<void>;
}
