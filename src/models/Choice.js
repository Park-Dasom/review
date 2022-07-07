import mongoose from "mongoose";

const { Schema } = mongoose;

const ChoiceSchema = new Schema({
  choiceID: String,
  choice: { type: Boolean, default: false },
  rate: Number,
});

const model = mongoose.model("Choice", ChoiceSchema);

export default model;
