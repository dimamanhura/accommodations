import { Schema, Model, Types, model, models } from 'mongoose';
export interface IUser {
  sender: Types.ObjectId;
  email: string;
  username: string;
  image: string;
  bookmarks: Types.DocumentArray<Types.ObjectId>;
  _id: string;
  createdAt: Date;
  updatedAt: Date;
};

const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    required: [true, 'Email is required'],
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
  },
  image: {
    type: String,
  },
  bookmarks: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Property',
    },
  ],
}, {
  timestamps: true,
});

const User: Model<IUser> = models.User || model<IUser>('User', UserSchema);

export default User;
