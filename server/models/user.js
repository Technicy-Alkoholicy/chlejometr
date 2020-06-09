import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const userSchema = new Schema(
  {
    username: String,
    email: String,
    password: String,
    characters: [],
    campaigns: [],
  },
  { collection: 'users' }
);

export default mongoose.model('user', userSchema);
