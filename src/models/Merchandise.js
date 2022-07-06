import mongoose from "mongoose";

const { Schema } = mongoose;

const MerchandiseSchema = new Schema({
  thumbnail: String,
  description: String,
  heart: { type: Boolean, default: false },
  star: { type: Number, default: 0 },
  createdAt: { type: Date, default: new Date() },
  updatedAt: Date,
});

const model = mongoose.model("Merchandise", MerchandiseSchema);

export default model;
