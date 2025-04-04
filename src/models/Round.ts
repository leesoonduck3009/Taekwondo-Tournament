import mongoose, { Model, Schema, Document } from "mongoose";
import { TableName } from "../enums/TableName";
import { IPlayer } from "./Player";

export interface IRound extends Document {
  matchId: mongoose.Types.ObjectId;
  roundNumber: number;
  winnerId?: mongoose.Types.ObjectId | IPlayer;
  gameTime: number; // Thời gian thi đấu (giây)
}

const RoundSchema = new Schema<IRound>(
  {
    matchId: {
      type: Schema.Types.ObjectId,
      ref: TableName.Match,
      required: true,
    },
    roundNumber: { type: Number, required: true },
    winnerId: { type: Schema.Types.ObjectId, ref: TableName.Player },
    gameTime: { type: Number, required: true },
  },
  { timestamps: true }
);
export const Round: Model<IRound> = mongoose.model(
  TableName.Round,
  RoundSchema
);
