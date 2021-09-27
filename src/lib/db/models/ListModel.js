import Sequelize from "sequelize";
import db from "../connection";

const ListModel = db.define("list", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    trim: true,
  },
  status: {
    type: Sequelize.ENUM("NOT_STARTED", "STARTED", "COMPLETED"),
    defaultValue: "NOT_STARTED",
  },
  lastStatusUpdate: {
    type: Sequelize.DATE,
    defaultValue: Date.now(),
  },
  isDefault: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  isRecipe: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

export default ListModel;
