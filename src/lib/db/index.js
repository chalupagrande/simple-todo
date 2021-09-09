import db from "./connection";
import UserModel from "./models/UserModel";
import ListModel from "./models/ListModel";
import { DataTypes } from "sequelize";

UserModel.hasMany(ListModel, {
  foreignKey: "owner",
  type: DataTypes.UUID,
});

ListModel.belongsTo(UserModel, {
  foreignKey: "owner",
  type: DataTypes.UUID,
});

// db.sync({ force: true });
db.sync();

export default db;
