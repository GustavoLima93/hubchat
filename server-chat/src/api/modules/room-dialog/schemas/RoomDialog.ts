import { model, Schema } from 'mongoose';

import IRoomDialog from './interfaces/IRoomDialog';

const RoomDialogSchema = new Schema<IRoomDialog>(
  {
    message: {
      type: String,
      requerid: true,
    },
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    roomId: {
      type: Schema.Types.ObjectId,
      ref: 'rooms',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default model<IRoomDialog>('RoomDialog', RoomDialogSchema);
