import mongoose from "mongoose";

const { Schema } = mongoose;

const MerchandiseSchema = new Schema({
  title: String,
  choice: { type: Boolean, default: false },
  rate: { type: Number, default: 0 },
  createdAt: { type: Date, default: new Date() },
  updatedAt: Date,
});

const model = mongoose.model("Merchandise", MerchandiseSchema);

export default model;
