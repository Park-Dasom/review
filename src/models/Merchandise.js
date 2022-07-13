import mongoose from "mongoose";

const { Schema } = mongoose;

const MerchandiseSchema = new Schema({
  title: String, // 상품의 이름
  choiceID: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Choice" }], // 해당 상품의 좋아요 ID
  rateID: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Rate" }], // 해상 상품의 평점 ID
  createdAt: { type: Date, default: new Date() }, // 상품 생성일자
  updatedAt: Date, // 상품 내용 수정일자
});

const model = mongoose.model("Merchandise", MerchandiseSchema);

export default model;
