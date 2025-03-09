import { Schema, model } from "mongoose";
import { ObjectId } from "mongodb";
interface Workflow {
  trigger_id: ObjectId; // trigger ref
  name: string;
  description?: string;
  status: "active" | "inactive";
}

const workflowSchema = new Schema<Workflow>({
  trigger_id: { type: Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  description: { type: String },
  status: { type: String, required: true, enum: ["active", "inactive"], default: "active" },
}, {
  timestamps: true,
})

export const Workflow = model<Workflow>("Workflow", workflowSchema);