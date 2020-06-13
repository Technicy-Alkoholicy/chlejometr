import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const partySchema = new Schema(
  {
    name: String,
    owner: mongoose.Types.ObjectId,
    isPartyOver: Boolean,
    members: [mongoose.Types.ObjectId],
    membersShots: [
      {
        userId: mongoose.Types.ObjectId,
        shots: [{ percent: Number, size: Number, date: Date }]
      }
    ]
  },
  { collection: 'parties' }
);

export default mongoose.model('party', partySchema);
