import { Schema, model } from "mongoose";
import { ObjectId } from "mongodb";

export interface Trigger {
  workflow_id: ObjectId; // workflow ref
  app: "GMAIL" | "DISCORD" | "REDDIT"; // TODO: update this after creating APPs
  event: string; // event type (like "message_sent") // TODO: update this type after creating APPs, check event by selected APP
  conditions?: {
    field: string;
    operator: "equals" | "contains" | "starts_with" | "ends_with"; // TODO: update this type after creating APPs
    value: any;
  };
  data_schema?: Record<string, any>; // the data type might be different for each app and event
}

const triggerSchema = new Schema<Trigger>(
  {
    workflow_id: { type: Schema.Types.ObjectId, required: true },
    app: { type: String, required: true },
    event: { type: String, required: true },
    conditions: {
      field: { type: String },
      operator: { type: String },
      value: { type: Schema.Types.Mixed },
    },
    data_schema: { type: Schema.Types.Mixed },
  },
  {
    timestamps: true,
  },
);

export const Trigger = model<Trigger>("Trigger", triggerSchema);