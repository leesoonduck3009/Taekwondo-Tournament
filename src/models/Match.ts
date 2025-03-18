import mongoose, { Model, Schema, Document } from "mongoose";
import { TableName } from "../enums/TableName";

export interface IMatch extends Document {
  tournamentGroupId: mongoose.Types.ObjectId;
  winnerId?: mongoose.Types.ObjectId;
  matchTime: Date;
}

const MatchSchema = new Schema<IMatch>({
  tournamentGroupId: {
    type: Schema.Types.ObjectId,
    ref: TableName.TournamentGroup,
    required: true,
  },
  winnerId: { type: Schema.Types.ObjectId, ref: TableName.Player },
  matchTime: { type: Date, required: true },
});

export const Match: Model<IMatch> = mongoose.model(
  TableName.Match,
  MatchSchema
);
