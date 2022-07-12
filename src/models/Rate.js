import mongoose from "mongoose";

const { Schema } = mongoose;

const RateSchema = new Schema({
  rateID: { type: mongoose.SchemaTypes.ObjectId, ref: "User" }, // 상품 등록시 merchandise objectID 로 변경
  rate: Number,
});

const model = mongoose.model("Rate", RateSchema);

export default model;
