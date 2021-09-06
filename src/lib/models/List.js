import mongoose from "mongoose";
import { ListItemSchema } from "./ListItem";
import { UserSchema } from "./User";

export const ListSchema = new mongoose.Schema({
  name: String,
  items: [ListItemSchema],
  owner: UserSchema,
  shared: [UserSchema],
  isRecipe: Boolean,
});

ListSchema.method("transform", function () {
  var obj = this.toObject();
  //Rename fields
  obj.id = obj._id;
  delete obj._id;
  return obj;
});

export const ListModel =
  mongoose.models?.List || mongoose.model("List", ListSchema);
export default ListModel;
