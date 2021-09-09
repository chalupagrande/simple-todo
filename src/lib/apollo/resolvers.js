import db from "~/lib/db";
import List from "~/lib/db/models/ListModel";
import User from "~/lib/db/models/UserModel";

export const resolvers = {
  Query: {
    async test() {
      try {
        await db.authenticate();
        return { success: true };
      } catch (error) {
        console.error("Unable to connect to the database:", error);
        return { success: false };
      }
    },
    async lists() {
      const lists = await List.findAll();
      return { items: lists };
    },
  },

  Mutation: {
    async createList(_, { data }) {
      try {
        const ownerData = data.owner;
        let listData = data;
        delete listData.owner;
        const [owner, wasCreated] = await User.findOrCreate({
          where: ownerData,
          defaults: ownerData,
        });
        const list = await List.create({
          ...listData,
          owner: owner.id,
        });
        const finalList = list.toJSON();
        finalList.owner = owner;
        return finalList;
      } catch (err) {
        console.error(err);
        throw Error(err);
      }
    },
    // async deleteList(_, _args) {
    //   try {
    //     await dbConnect();
    //     await List.deleteOne({ _id: _args._id });
    //     return { success: true };
    //   } catch (err) {
    //     console.error(err);
    //     throw Error(err);
    //   }
    // },
  },
};
