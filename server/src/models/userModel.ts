import { Schema, model } from "mongoose";

interface User {
  username: string;
  email: string;
  password: string;
  avatar: string;
  role: "admin" | "user";
  active: boolean;
}

const userSchema = new Schema<User>(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    avatar: {
      type: String,
      default: "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
    },
    role: { type: String, required: true, enum: ["admin", "user"], default: "user" },
  },
  {
    timestamps: true,
  },
);

export const User = model<User>("User", userSchema);
