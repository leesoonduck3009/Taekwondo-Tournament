import mongoose, { Model, Schema, Document } from "mongoose";
import { Side } from "../enums/Side";
import { TableName } from "../enums/TableName";

export interface IMatchDetail extends Document {
  matchId: mongoose.Types.ObjectId;
  playerId: mongoose.Types.ObjectId;
  side: Side;
  winMatch: number;
}

const MatchDetailSchema = new Schema<IMatchDetail>({
  matchId: {
    type: Schema.Types.ObjectId,
    ref: TableName.Match,
    required: true,
  },
  playerId: {
    type: Schema.Types.ObjectId,
    ref: TableName.Player,
    required: true,
  },
  side: { type: String, enum: Object.values(Side), required: true },
  winMatch: { type: Number, default: 0 },
});
export const MatchDetail: Model<IMatchDetail> = mongoose.model(
  TableName.MatchDetail,
  MatchDetailSchema
);
