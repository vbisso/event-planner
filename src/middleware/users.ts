import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  googleId: string;
  displayName: string;
  email?: string;
}

const userSchema = new Schema<IUser>({
  googleId: { type: String, required: true, unique: true },
  displayName: { type: String, required: true },
  email: String,
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
