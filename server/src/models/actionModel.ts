import type { ObjectId } from "mongodb";
import { Schema, model } from "mongoose";

export interface Action {
  workflow_id: ObjectId; // workflow ref
  index: number; // order of the action
  app: "GMAIL" | "DISCORD" | "REDDIT"; // TODO: update this after creating APPs
  type: string; // action type (like "send_message")
  data: Record<string, any>; // action-specific data
  // maybe we can add another field for data transformation, scenario: if we want to transform the data before sending it to the app
}

const actionSchema = new Schema<Action>(
  {
    workflow_id: { type: Schema.Types.ObjectId, required: true },
    index: { type: Number, required: true },
    app: { type: String, required: true },
    type: { type: String, required: true },
    data: { type: Schema.Types.Mixed },
  },
  {
    timestamps: true,
  },
);

export const Action = model<Action>("Action", actionSchema);
