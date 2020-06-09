import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const partySchema = new Schema(
  {
    name: String,
    members: [mongoose.Types.ObjectId],
    membersShots: [{ userId: mongoose.Types.ObjectId, shots: [{ percent: Number, number: Number }] }]
  },
  { collection: 'parties' }
);

export default mongoose.model('party', partySchema);
