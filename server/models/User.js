import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  verified: { type: Boolean, default: false }, // field to track email verification status
  verificationToken: { type: String }, // field to store the verification token
});

const UserModel = mongoose.model("User", UserSchema);

export { UserModel as User };
