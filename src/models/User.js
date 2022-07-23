import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema({
  userID: String, // 회원가입, 로그인 시 필요한 아이디
  name: String, // 회원의 이름
  role: { type: String, default: "normal" }, // 회원등급
  choiceID: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Choice" }], // 상품의 좋아요 ID
  rateID: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Rate" }], // 상품의 별점 ID
  commentID: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Comment" }], // 작성한 댓글 ID
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  createdAt: { type: Date, default: new Date() }, // 유저 생설 일자
  updatedAt: Date, // 유저 내용 수정 일자
});

UserSchema.plugin(passportLocalMongoose, { usernameField: "userID" });

const model = mongoose.model("User", UserSchema);

export default model;
