import mongoose from "mongoose";

const { Schema } = mongoose;

const RatingeSchema = new Schema({
  rating: { type: Number, default: 0 },
  createdAt: { type: Date, default: new Date() },
  updatedAt: Date,
});

const model = mongoose.model("Ratinge", RatingeSchema);

export default model;
