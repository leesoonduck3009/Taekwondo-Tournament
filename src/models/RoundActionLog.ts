import mongoose, { Model, Schema, Document } from "mongoose";
import { ActionType } from "../enums/ActionType";
import { TableName } from "../enums/TableName";

export interface IRoundActionLog extends Document {
  roundId: mongoose.Types.ObjectId;
  playerId: mongoose.Types.ObjectId;
  actionType: ActionType;
  damage: number;
  score: number;
}

const RoundActionLogSchema = new Schema<IRoundActionLog>({
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
  actionType: { type: String, enum: Object.values(ActionType), required: true },
  damage: { type: Number, required: true },
  score: { type: Number, required: true },
});

export const RoundActionLog: Model<IRoundActionLog> = mongoose.model(
  TableName.RoundActionLog,
  RoundActionLogSchema
);
