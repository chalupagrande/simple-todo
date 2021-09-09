import db from "~/lib/db";
import List from "~/lib/db/models/ListModel";
import User from "~/lib/db/models/UserModel";

export const resolvers = {
  Query: {
    /**
     * YOU WHERE HERE 9.8.21
     * You were testing how findOne Works
     * NOTICE THE .getUser !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
     * TODO: Adapt this into a List GRAPHQL query
     *
     */
    async test(_, { data }) {
      console.log("DATA >>>>>>>>>>>> ", data);
      const list = await List.findOne({
        where: data,
      });
      console.log("LIST >>>>>>>>>>>>>> ", list.toJSON());
      let owner = await list.getUser();
      console.log("owner >>>>>>>>>>>>>> ", owner.toJSON());
      return { success: true };
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
