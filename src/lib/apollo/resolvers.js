import db from "~/lib/db";
import List from "~/lib/db/models/ListModel";
import User from "~/lib/db/models/UserModel";

export const resolvers = {
  Query: {
    async lists(_, { auth0Id }) {
      let lists;
      if (auth0Id) {
        // get only lists owned by user
        lists = await List.findAll({
          include: [
            {
              where: { auth0Id: auth0Id },
              model: User,
            },
          ],
        });
      } else {
        // get all lists
        lists = await List.findAll();
      }
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
        });
        owner.addList(list);
        const finalList = list.toJSON();
        finalList.owner = owner;
        return finalList;
      } catch (err) {
        console.error(err);
        throw Error(err);
      }
    },

    async updateListStatus(_, { id, status }) {
      try {
        const list = await List.findOne({ where: { id } });
        list.set("status", status);
        list.set("lastStatusUpdate", new Date());
        let final = await list.save();
        console.log("FINAL", final);
        return final.toJSON();
      } catch (err) {
        console.error(err);
        throw Error(err);
      }
    },

    async deleteList(_, { id }) {
      try {
        await List.destroy({ where: { id } });
        return { success: true };
      } catch (err) {
        console.error(err);
        throw Error(err);
      }
    },
  },
};
