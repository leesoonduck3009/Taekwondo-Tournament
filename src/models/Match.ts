import mongoose, { Model, Schema, Document } from "mongoose";
import { TableName } from "../enums/TableName";
import { IPlayer } from "./Player";
import { IRound } from "./Round";
import { ITournamentGroup } from "./TournamentGroup";
export enum MatchSide {
  Red = "Red",
  Blue = "Blue",
}

export interface IMatch extends Document {
  tournamentGroupId: mongoose.Types.ObjectId | ITournamentGroup;
  name: string;
  winnerId?: mongoose.Types.ObjectId | IPlayer;
  redPlayerId?: mongoose.Types.ObjectId | IPlayer;
  bluePlayerId?: mongoose.Types.ObjectId | IPlayer;
  matchTime: Date;
  parentMatchId?: mongoose.Types.ObjectId | IMatch;
  parentMatchSide?: MatchSide;
  loseParentMatchId?: mongoose.Types.ObjectId | IMatch;
  loseParentMatchSide?: MatchSide;
  isFinished: boolean;
  redWins: number;
  blueWins: number;
  matchNo: number;
}

const MatchSchema = new Schema<IMatch>(
  {
    tournamentGroupId: {
      type: Schema.Types.ObjectId,
      ref: TableName.TournamentGroup,
      required: true,
    },
    name: { type: String, required: true },
    winnerId: { type: Schema.Types.ObjectId, ref: TableName.Player },
    redPlayerId: {
      type: Schema.Types.ObjectId,
      ref: TableName.Player,
    },
    bluePlayerId: {
      type: Schema.Types.ObjectId,
      ref: TableName.Player,
    },
    redWins: { type: Number, default: 0 },
    blueWins: { type: Number, default: 0 },
    parentMatchSide: {
      type: String,
      enum: [MatchSide.Red, MatchSide.Blue],
    },
    parentMatchId: {
      type: Schema.Types.ObjectId,
      ref: TableName.Match,
    },
    loseParentMatchId: {
      type: Schema.Types.ObjectId,
      ref: TableName.Match,
    },
    loseParentMatchSide: {
      type: String,
      enum: [MatchSide.Red, MatchSide.Blue],
    },
    isFinished: { type: Boolean, default: false },
    matchTime: { type: Date, default: Date.now },
    matchNo: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Match: Model<IMatch> = mongoose.model(
  TableName.Match,
  MatchSchema
);
