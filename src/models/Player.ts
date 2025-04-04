import mongoose, { Model, Schema, Document } from "mongoose";
import { Gender } from "../enums/Gender";
import { TableName } from "../enums/TableName";
import { ITournamentGroup } from "./TournamentGroup";

export interface IPlayer extends Document {
  name: string;
  studentId: string;
  gender: Gender;
  weight: number;
  avatarUrl: string;
}

const PlayerSchema = new Schema<IPlayer>(
  {
    name: { type: String, required: true },
    studentId: { type: String, required: true },
    gender: { type: String, enum: Object.values(Gender), required: true },
    weight: { type: Number, required: true },
    avatarUrl: { type: String, required: true },
  },
  { timestamps: true }
);

export const Player: Model<IPlayer> = mongoose.model(
  TableName.Player,
  PlayerSchema
);
