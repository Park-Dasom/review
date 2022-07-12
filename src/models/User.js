import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema({
  userID: String,
  name: String,
  role: { type: String, default: "general" },
  // choice: { type: Boolean, default: false },
  // rate: { type: Number, default: 0 },
  commentID: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Comment" }],
  merchandiseID: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Merchandise" }],
  createdAt: { type: Date, default: new Date() },
  updatedAt: Date,
});

UserSchema.plugin(passportLocalMongoose, { usernameField: "userID" });

const model = mongoose.model("User", UserSchema);

export default model;
