import Sequelize from "sequelize";
import db from "../connection";

const UserModel = db.define(
  "user",
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      trim: true,
      unique: true,
    },
    auth_id: {
      type: Sequelize.STRING,
      allowNull: false,
      trim: true,
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default UserModel;
