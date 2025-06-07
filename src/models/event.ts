import mongoose, { Document, Schema } from "mongoose";

export interface IEvent extends Document {
  title: string;
  description?: string;
  location?: string;
  date: string;
  time?: string;
  organizer?: string;
  category?: string;
  isPublic?: boolean;
}

const eventSchema = new Schema<IEvent>({
  title: { type: String, required: true },
  description: { type: String },
  location: { type: String },
  date: { type: String, required: true },
  time: { type: String },
  organizer: { type: String },
  category: { type: String },
  isPublic: { type: Boolean },
});

const Event = mongoose.model<IEvent>("Event", eventSchema);

export default Event;
