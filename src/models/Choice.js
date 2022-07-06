import mongoose from "mongoose";

const { Schema } = mongoose;

const ChoiceSchema = new Schema({
  choice: { type: Boolean, default: false },
  createdAt: { type: Date, default: new Date() },
  updatedAt: Date,
});

const model = mongoose.model("Choice", ChoiceSchema);

export default model;
