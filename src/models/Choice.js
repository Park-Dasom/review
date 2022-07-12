import mongoose from "mongoose";

const { Schema } = mongoose;

const ChoiceSchema = new Schema({
  choiceID: { type: mongoose.SchemaTypes.ObjectId, ref: "Merchandise" }, // 상품 등록시 merchandise objectID 로 변경
  choice: { type: Boolean, default: false },
});

const model = mongoose.model("Choice", ChoiceSchema);

export default model;
