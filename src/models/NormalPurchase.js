import mongoose from "mongoose";

const { Schema } = mongoose;

const NormalPurchaseSchema = new Schema({
  imp_uid: String,
  merchant_uid: String,
  paid_amount: Number,
  price: Number, // 금액
  card_number: String, // 카드번호
  expiry: String, // 카드 유효기간
  birth: String, // 생년월일

  userID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: new Date() },
  updatedAt: Date,
});

const model = mongoose.model("NormalPurchase", NormalPurchaseSchema);

export default model;
