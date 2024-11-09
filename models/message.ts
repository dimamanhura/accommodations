import { Document, Schema, Types, model, models } from 'mongoose';

export interface IMessage extends Document {
  sender: Types.ObjectId;
  recipient: Types.ObjectId;
  property:  Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  body: string;
  read: boolean;
  _id: string;
  createdAt: Date;
  updatedAt: Date;
};

const MessageSchema = new Schema<IMessage>(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    recipient: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    property: {
      type: Schema.Types.ObjectId,
      ref: 'Property',
      required: true,
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
    },
    phone: String,
    body: String,
    read: {
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: true,
  },
);

const Message = models.Message || model<IMessage>('Message', MessageSchema);

export default Message;
