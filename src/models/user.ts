import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  googleId?: string; // optional for manual signups
  displayName: string;
  email: string;
  password?: string; // for manual signups
  role?: string;
}

const userSchema = new Schema<IUser>({
  googleId: { type: String, unique: true, sparse: true },
  displayName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  role: { type: String, default: "user" },
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
