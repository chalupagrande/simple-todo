import db from "~/lib/db";
import List from "~/lib/db/models/ListModel";
import User from "~/lib/db/models/UserModel";

export const resolvers = {
  Query: {
    // Gets Lists owned by a User
    async lists(_, { id, auth0Id, filter }) {
      let list = await List.findOne({
        where: id ? { id } : { isDefault: true },
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
      return { items: final.children, parent: final };
    },

    // creates User in DB
    async checkUser(_, { user }) {
      // creates the user if it wasnt already
      const [userCreated, wasCreated] = await User.findOrCreate({
        where: { auth0Id: user.auth0Id },
        defaults: user,
      });
      if (wasCreated) {
        // creates a default list for the user
        let defaultList = await List.create({
          name: "_DEFAULT_",
          isRecipe: true,
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
        let parents = await owner.getLists({ where: query });
        let parent = parents[0];

        // create List
        const list = await List.create({
          ...data,
          addedBy: owner.id,
        });

        parent.addChild(list);
        owner.addList(list);

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
        console.log("DATA", data);
        for (let [key, value] of Object.entries(data)) {
          if (key === "id") continue;
          else {
            list.set(key, value);
          }

          if (key === "status") {
            list.set("lastStatusUpdate", new Date());
          }
        }
        let final = await list.save();
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
