import moment from "moment";
import mongoose from "mongoose";

const { Schema } = mongoose;

const CommentSchema = new Schema({
  userID: String,
  name: String,
  comments: String,
  createdAt: { type: Date, default: new Date() },
});

const model = mongoose.model("Comment", CommentSchema);

export default model;
