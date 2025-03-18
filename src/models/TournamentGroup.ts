import mongoose, { Model, Schema, Document } from "mongoose";
import { Gender } from "../enums/Gender";
import { TableName } from "../enums/TableName";

export interface ITournamentGroup extends Document {
  totalPlayers: number;
  gender: Gender;
  weightClass: string;
}

const TournamentGroupSchema = new Schema<ITournamentGroup>({
  totalPlayers: { type: Number, required: true },
  gender: { type: String, enum: Object.values(Gender), required: true },
  weightClass: { type: String, required: true },
});

export const TournamentGroup: Model<ITournamentGroup> = mongoose.model(
  TableName.TournamentGroup,
  TournamentGroupSchema
);
