import mongoose from "mongoose";

const { Schema } = mongoose;

const NormalPurchaseSchema = new Schema({
  thumbnail: String,
  data1: String,
  data2: String,
  data3: String,
  data4: String,
  userID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: new Date() },
  updatedAt: Date,
});

const model = mongoose.model("NormalPurchase", NormalPurchaseSchema);

export default model;
