import mongoose from "mongoose";
import { ListItemSchema } from "./ListItem";

export const ListSchema = new mongoose.Schema({
  name: String,
  items: [ListItemSchema],
});

export const ListModel =
  mongoose.models?.List || mongoose.model("List", ListSchema);
export default ListModel;
