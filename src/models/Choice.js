import mongoose from "mongoose";

const { Schema } = mongoose;

const ChoiceSchema = new Schema({
  merchandiseID: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Merchandise" }], // 종아요가 해당하는 상품의 ID
  userID: [{ type: mongoose.SchemaTypes.ObjectId, ref: "User" }], // 종아요를 누른 유저의 ID
  choice: { type: Boolean, default: false }, // 좋아요 상태 유/무 true / false
});

const model = mongoose.model("Choice", ChoiceSchema);

export default model;
