export default interface IRoom {
  id?: string;
  name: string;
  owner?: string;
  description?: string;
  createdAt: Date;
}
