import mongoose from "mongoose";

const { Schema } = mongoose;

const CommentSchema = new Schema({
  userID: { type: mongoose.SchemaTypes.ObjectId, ref: "User" }, // 댓글을 작성한 유저의 ID
  comments: String, // 댓글 내용
  createdAt: { type: Date, default: new Date() }, // 댓글 작성 일자
});

const model = mongoose.model("Comment", CommentSchema);

export default model;
