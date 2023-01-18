import mongoose from "mongoose";

const { Schema } = mongoose;

const ChatSchema = new Schema({
  userID: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  talk: { type: String, default: "" }, // 대화 내용
  unread: {
    count: { type: Number, default: 0 },
    userID: String,
  },
  createdAt: { type: Date, default: new Date() },
  updatedAt: Date,
  status: { type: Boolean, default: true }, // 대화 상대방의 존재여부 (true: 둘 다 존재, false: 한 사람만 존재)
  toUser: Object, // 데이터 가공용
  fromUser: Object, // 데이터 가공용
  finalTalk: String, // 데이터 가공용
});

const model = mongoose.model("Chat", ChatSchema);

export default model;
