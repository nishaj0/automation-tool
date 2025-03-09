import { Schema, model } from "mongoose";

export interface Trigger {
  app: "GMAIL" | "DISCORD" | "REDDIT" | "SCHEDULE"; // TODO: update this after creating APPs
  event: string; // event type (like "message_sent") // TODO: update this type after creating APPs, check event by selected APP
  conditions?: {
    field: string;
    operator: "equals" | "contains" | "starts_with" | "ends_with"; // TODO: update this type after creating APPs
    value: any;
  };
  data_schema?: Record<string, any>; // the data type might be different for each app and event, fo the SCHEDULE we will stores the cron time and timezone
}

const triggerSchema = new Schema<Trigger>(
  {
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
