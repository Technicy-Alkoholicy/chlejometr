import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const partySchema = new Schema(
  {
    name: String,
    members: [mongoose.Types.ObjectId],
    measures: [mongoose.Types.ObjectId]
  },
  { collection: 'parties' }
);

export default mongoose.model('party', partySchema);
