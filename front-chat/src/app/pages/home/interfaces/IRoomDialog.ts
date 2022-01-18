export interface OwnerId {
  _id?: string;
  name?: string;
  email?: string;
}

export interface IRoomDialog {
  _id?: string;
  message: string;
  ownerId?: OwnerId | string;
  status?: string;
  roomId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

