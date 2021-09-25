import db from "./connection";
import UserModel from "./models/UserModel";
import ListModel from "./models/ListModel";

// one to many User:List
UserModel.belongsToMany(ListModel, {
  through: "user_lists",
});

ListModel.belongsToMany(UserModel, {
  through: "user_lists",
});

// many to many List:List
ListModel.belongsToMany(ListModel, {
  as: "children",
  foreignKey: "subLists",
  through: "lists_lists",
});

ListModel.belongsToMany(ListModel, {
  as: "parents",
  foreignKey: "parentLists",
  through: "lists_lists",
});

// db.sync({ alter: true });
// db.sync({ force: true });
db.sync();

export default db;
