import db from "~/lib/db";
import List from "~/lib/db/models/ListModel";
import User from "~/lib/db/models/UserModel";

export const resolvers = {
  Query: {
    // Gets List owned by a User
    async list(_, { id, auth0Id, filter }) {
      const list = await List.findOne({
        where: id ? { id } : filter,
        include: [
          {
            model: List,
            as: "children",
          },
          {
            model: User,
            where: { auth0Id },
          },
        ],
      });
      const final = list.toJSON();
      final.children = { items: final.children };
      return final;
    },
    // get multiple lists
    async lists(_, { auth0Id, filter }) {
      const lists = await List.findAll({
        where: filter || {},
        include: [
          {
            model: List,
            as: "children",
          },
          {
            model: User,
            where: { auth0Id },
          },
        ],
      });
      console.log("LISTS", lists);
      return { items: lists };
    },

    // creates User in DB
    async checkUser(_, { user }) {
      // creates the user if it wasn't already
      const [userCreated, wasCreated] = await User.findOrCreate({
        where: { auth0Id: user.auth0Id },
        defaults: user,
      });
      if (wasCreated) {
        // creates a default list for the user
        const defaultList = await List.create({
          name: "_DEFAULT_",
          isParent: true,
          isDefault: true,
        });
        userCreated.addList(defaultList);
      }

      return { success: true };
    },
  },

  Mutation: {
    async createList(_, { data, user, parentList }) {
      try {
        // find user
        const owner = await User.findOne({
          where: { auth0Id: user.auth0Id },
        });

        // find parent list
        const query = {};
        if (!parentList) query.isDefault = true;
        else query.id = parentList.id;
        const parents = await owner.getLists({ where: query });
        const parent = parents[0];

        // create List
        const list = await List.create({
          ...data,
          addedBy: owner.id,
        });

        // update relationships
        parent.isParent = true;
        parent.addChild(list);
        owner.addList(list);
        await parent.save();

        const finalList = list.toJSON();
        finalList.owner = owner;
        return finalList;
      } catch (err) {
        console.error(err);
        throw Error(err);
      }
    },

    async updateList(_, { id, data }) {
      try {
        const list = await List.findOne({ where: { id } });
        for (const [key, value] of Object.entries(data)) {
          if (key === "id") continue;
          else {
            list.set(key, value);
          }

          if (key === "status") {
            list.set("lastStatusUpdate", new Date());
          }
        }

        const final = await list.save();
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
