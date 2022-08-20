import mongoose from "mongoose";

const { Schema } = mongoose;

const MerchandiseSchema = new Schema({
  thumbnail1: String, // 상품 이미지1
  thumbnail2: String, // 상품 이미지2
  title: String, // 상품 이름
  price: Number, // 상품 가격
  discountRate: Number, // 가격 할인율
  extraDiscount: Number, // 특별 회원의 추가 할인가격
  rate: [],
  avgRate: { type: Number, default: 0 },
  rateID: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Rate" }], // 해상 상품의 평점 ID
  choiceUserID: [{ type: mongoose.SchemaTypes.ObjectId, ref: "User" }], // 해당 상품에 좋아요를 누른 유저의 ID
  rateUserID: [{ type: mongoose.SchemaTypes.ObjectId, ref: "User" }], // 해당 상품에 별점을 누른 유저의 ID
  createdAt: { type: Date, default: new Date() }, // 상품 생성일자
  updatedAt: Date, // 상품 내용 수정일자
});

const model = mongoose.model("Merchandise", MerchandiseSchema);

export default model;
