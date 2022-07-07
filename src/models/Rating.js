import mongoose from "mongoose";

const { Schema } = mongoose;

const RatingeSchema = new Schema({
  ratingIndex: String,
  ratingID: { type: Number, default: 0 },
});

const model = mongoose.model("Ratinge", RatingeSchema);

export default model;
