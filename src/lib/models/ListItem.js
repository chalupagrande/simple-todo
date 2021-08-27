import mongoose from "mongoose";

export const ListItemSchema = new mongoose.Schema({
  text: String,
  status: Boolean,
  completedAt: Date,
});

export const ListItemModel =
  mongoose.models?.ListItem || mongoose.model("ListItem", ListItemSchema);
export default ListItemModel;
