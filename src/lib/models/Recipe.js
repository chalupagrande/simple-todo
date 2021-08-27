import mongoose from "mongoose";

export const RecipeSchema = new mongoose.Schema({
  name: String,
  items: [mongoose.Schema.Types.Mixed],
});

export const RecipeModel =
  mongoose.models?.Recipe || mongoose.model("Recipe", RecipeSchema);
export default RecipeModel;
