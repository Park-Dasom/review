import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema({
  userID: String,
  name: String,
  role: { type: String, default: "general" },
  commentID: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Comment" }],
  createdAt: { type: Date, default: new Date() },
  updatedAt: Date,
});

UserSchema.plugin(passportLocalMongoose, { usernameField: "userID" });

const model = mongoose.model("User", UserSchema);

export default model;
