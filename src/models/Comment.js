import mongoose from "mongoose";

const { Schema } = mongoose;

const CommentSchema = new Schema({
  userID: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
  comments: String,
  createdAt: { type: Date, default: new Date() },
});

const model = mongoose.model("Comment", CommentSchema);

export default model;
