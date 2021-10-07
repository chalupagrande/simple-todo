import Sequelize from "sequelize";
import db from "../connection";

const ListModel = db.define(
  "list",
  {
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
    last_status_update: {
      type: Sequelize.DATE,
      defaultValue: null,
    },
    is_default: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    is_parent: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default ListModel;
