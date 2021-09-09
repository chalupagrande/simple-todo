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
  },
  isRecipe: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  status: {
    type: Sequelize.ENUM("NOT_STARTED", "STARTED", "COMPLETED"),
    defaultValue: "NOT_STARTED",
  },
  items: {
    type: Sequelize.ARRAY(Sequelize.UUID),
    allowNull: true,
    trim: true,
  },
});

export default ListModel;
