import mongoose from "mongoose";

const { Schema } = mongoose;

const RateSchema = new Schema({
  userID: [{ type: mongoose.SchemaTypes.ObjectId, ref: "User" }], // 별점을 등록한 유저의 ID
  merchandiseID: { type: mongoose.SchemaTypes.ObjectId, ref: "Merchandise" }, // 해당 별점이 속한 상품의 ID
  rate: Number, // 별점 갯수
});

const model = mongoose.model("Rate", RateSchema);

export default model;
