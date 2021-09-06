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
    async createList(_, { data }) {
      try {
        await dbConnect();
        // const owner = data.owner
        /**
         * TODO: FIX THIS
         */
        // let listData = data
        // delete listData.owner
        // listData.owner =
        // const user = await User.findOneAndUpdate({auth0Id: owner.auth0Id}, owner, {new: true, upsert: true})
        const list = new List(data);

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
