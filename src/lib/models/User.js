import mongoose from "mongoose";
export const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  auth0Id: String,
});

export const UserModel =
  mongoose.models?.User || mongoose.model("User", UserSchema);
export default UserModel;
