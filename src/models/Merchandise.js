import mongoose from "mongoose";

const { Schema } = mongoose;

const MerchandiseSchema = new Schema({
  title: String, // 상품의 이름
  choiceID: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Choice" }], // 해당 상품에 좋아요 ID
  rateID: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Rate" }],
  createdAt: { type: Date, default: new Date() },
  updatedAt: Date,
});

const model = mongoose.model("Merchandise", MerchandiseSchema);

export default model;
