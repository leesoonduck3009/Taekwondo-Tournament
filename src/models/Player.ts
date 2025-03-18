import mongoose, { Model, Schema, Document } from "mongoose";
import { Gender } from "../enums/Gender";
import { TableName } from "../enums/TableName";

export interface IPlayer extends Document {
  name: string;
  gender: Gender;
  weight: number;
  tournamentGroupId: mongoose.Types.ObjectId;
}

const PlayerSchema = new Schema<IPlayer>({
  name: { type: String, required: true },
  gender: { type: String, enum: Object.values(Gender), required: true },
  weight: { type: Number, required: true },
  tournamentGroupId: {
    type: Schema.Types.ObjectId,
    ref: TableName.TournamentGroup,
    required: true,
  },
});

export const Player: Model<IPlayer> = mongoose.model(
  TableName.Player,
  PlayerSchema
);
