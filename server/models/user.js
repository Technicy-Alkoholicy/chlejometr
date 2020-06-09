import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const userSchema = new Schema(
  {
    username: String,
    email: String,
    password: String,

    weight: Number,
    sex: String,
    height: Number,
    age: Number,
    isPrivate: Boolean,

    parties: [mongoose.Types.ObjectId],
  },
  { collection: 'users' }
);

export default mongoose.model('user', userSchema);
