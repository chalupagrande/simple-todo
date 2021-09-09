import Sequelize from "sequelize";
import db from "../connection";

const UserModel = db.define("user", {
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
  auth0Id: {
    type: Sequelize.STRING,
    allowNull: false,
    trim: true,
  },
});

export default UserModel;
