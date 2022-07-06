import mongoose from "mongoose";

const { Schema } = mongoose;

const RatingeSchema = new Schema({
  ratingID: String,
  rating: { type: Number, default: 0 },
});

const model = mongoose.model("Ratinge", RatingeSchema);

export default model;
