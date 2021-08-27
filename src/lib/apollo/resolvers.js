import { ConsoleSqlOutlined } from "@ant-design/icons";
import dbConnect from "~/lib/dbConnect";
import List from "~/lib/models/List";

export const resolvers = {
  Query: {
    async lists() {
      await dbConnect();
      let lists = List.find().lean();
      return { items: lists };
    },
  },

  Mutation: {
    async createList(_, _args) {
      try {
        await dbConnect();
        const list = new List(_args);
        await list.save();
        return list;
      } catch (err) {
        console.error(err);
        throw Error(err);
      }
    },
    async deleteList(_, _args) {
      try {
        await dbConnect();
        await List.deleteOne({ _id: _args._id });
        return { success: true };
      } catch (err) {
        console.error(err);
        throw Error(err);
      }
    },
  },
};
