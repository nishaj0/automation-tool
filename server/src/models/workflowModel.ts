import { Schema, model } from "mongoose";

interface Workflow {
  name: string;
  description?: string;
  status: "active" | "inactive";
}

const workflowSchema = new Schema<Workflow>({
  name: { type: String, required: true },
  description: { type: String },
  status: { type: String, required: true, enum: ["active", "inactive"], default: "active" },
}, {
  timestamps: true,
})

export const Workflow = model<Workflow>("Workflow", workflowSchema);