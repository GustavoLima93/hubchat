export default interface IRoom {
  _id?: string;
  name: string;
  owner?: string;
  description?: string;
  createdAt: Date;
  index?: number;
  notification?: number;
}
