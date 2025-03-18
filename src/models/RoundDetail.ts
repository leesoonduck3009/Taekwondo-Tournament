import mongoose, { Model, Schema, Document } from "mongoose";
import { TableName } from "../enums/TableName";

export interface IRoundDetail extends Document {
  roundId: mongoose.Types.ObjectId;
  playerId: mongoose.Types.ObjectId;
  score: number;
  health: number;
  faultNumber: number;
}

const RoundDetailSchema = new Schema<IRoundDetail>({
  roundId: {
    type: Schema.Types.ObjectId,
    ref: TableName.Round,
    required: true,
  },
  playerId: {
    type: Schema.Types.ObjectId,
    ref: TableName.Player,
    required: true,
  },
  score: { type: Number, required: true },
  health: { type: Number, required: true },
  faultNumber: { type: Number, default: 0 },
});

export const RoundDetail: Model<IRoundDetail> = mongoose.model(
  TableName.RoundDetail,
  RoundDetailSchema
);
