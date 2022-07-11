import mongoose from "mongoose";

const { Schema } = mongoose;

const ChoiceSchema = new Schema({
  choiceID: String, // 상품 등록시 merchandise objectID 로 변경
  choice: { type: Boolean, default: false },
  rate: Number,
});

const model = mongoose.model("Choice", ChoiceSchema);

export default model;
