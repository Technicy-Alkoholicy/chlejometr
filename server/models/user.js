import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const userSchema = new Schema(
  {
    username: String,
    email: String,
    password: String,

    weight: Number,
    gender: String,
    height: Number,
    age: Number,
    isPrivate: Boolean,

    parties: [mongoose.Types.ObjectId],
    friends: [mongoose.Types.ObjectId],
    friendInvitations: [mongoose.Types.ObjectId]
  },
  { collection: 'users' }
);

export default mongoose.model('user', userSchema);
