import db from "~/lib/db";
import List from "~/lib/db/models/ListModel";
import User from "~/lib/db/models/UserModel";
import { Op } from "sequelize";

export const resolvers = {
  Query: {
    // Gets List owned by a User
    async list(_, { id, auth_id, filter }) {
      const list = await List.findOne({
        where: id ? { id } : filter,
        include: [
          {
            model: List,
            as: "children",
          },
          {
            model: User,
            where: { auth_id },
          },
        ],
      });
      const final = list.toJSON();
      final.children = { items: final.children };
      return final;
    },
    // get multiple lists
    async lists(_, { auth_id, filter }) {
      const lists = await List.findAll({
        where: filter || {},
        include: [
          {
            model: List,
            as: "children",
          },
          {
            model: User,
            where: { auth_id },
          },
        ],
      });
      return { items: lists };
    },

    async shared(_, { auth_id }) {
      const owner = await User.findOne({ where: { auth_id } });
      const lists = await List.findAll({
        where: {
          [Op.and]: [
            { added_by: { [Op.not]: owner.id } },
            { is_default: false },
          ],
        },
        include: [
          {
            model: List,
            as: "children",
          },
          {
            model: User,
            where: { auth_id },
          },
        ],
      });
      return { items: lists };
    },

    // creates User in DB
    async checkUser(_, { user }) {
      // creates the user if it wasn't already
      const [userCreated, userWasCreated] = await User.findOrCreate({
        where: { auth_id: user.auth_id },
        defaults: user,
      });
      const [defaultList, listWasCreated] = await List.findOrCreate({
        where: {
          added_by: userCreated.id,
          is_default: true,
        },
        defaults: {
          name: "Main",
          is_parent: true,
          is_default: true,
          added_by: userCreated.id,
        },
      });

      if (listWasCreated) {
        // creates a default list for the user
        userCreated.addList(defaultList);
      }

      return { success: true };
    },

    // search users
    async users(_, { filter }) {
      const where = makeWhereFromStringFilter(filter);
      const userList = User.findAll({ where });
      return { items: userList };
    },
  },

  Mutation: {
    async createList(_, { data, user, parentList }) {
      try {
        // find user
        const owner = await User.findOne({
          where: { auth_id: user.auth_id },
        });

        // find parent list
        const query = {};
        if (!parentList) query.is_default = true;
        else query.id = parentList.id;
        const parents = await owner.getLists({ where: query }); // cannot be made singular
        const parent = parents[0];

        // create List
        const list = await List.create({
          ...data,
          added_by: owner.id,
        });

        // update relationships
        parent.is_parent = true;
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
            list.set("last_status_update", new Date());
          }
        }

        const final = await list.save();
        return final.toJSON();
      } catch (err) {
        console.error(err);
        throw Error(err);
      }
    },

    async shareList(_, { id, userId }) {
      try {
        const list = await List.findOne({ where: { id } });
        const user = await User.findOne({ where: { id: userId } });
        user.addList(list);
        user.save();
        return { success: true };
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

export function makeWhereFromStringFilter(filter) {
  const where = Object.entries(filter).reduce((a, [key, predicate]) => {
    const opDef = Object.entries(predicate).reduce((aa, [operation, value]) => {
      if (operation === "contains") {
        aa[Op.substring] = value;
      } else if (operation === "equals") {
        aa[Op.eq] = value;
      } else if (operation === "not_equals") {
        aa[Op.ne] = value;
      } else if (operation === "is_empty") {
        aa[Op.is] = null;
      } else if (operation === "is_not_empty") {
        aa[Op.not] = null;
      } else {
        aa[Op.eq] = value;
      }
      return aa;
    }, {});
    a[key] = opDef;
    return a;
  }, {});
  return where;
}

/**
 *
 *
 *  _____ ___  ___   ___
 * |_   _/ _ \|   \ / _ \
 *   | || (_) | |) | (_) |
 *   |_| \___/|___/ \___/
 *
 * TODO
 * There is a better way to write a filters... (ie like 8base's filter system)
 * but the goal of this project is not to reinvent what 8base has done and the complexity of
 * their system. so... if you are reading this... pretend that I took the time to write
 * a really complex, universal and interesting graphql schema. And that I didnt
 * treat it like a REST api....
 *
 *
 */
// export function makeWhereFromIdFilter(filter) {
//   const where = Object.entries(filter).reduce((a, [key, predicate]) => {
//     const opDef = Object.entries(predicate).reduce((aa, [operation, value]) => {
//       if (operation === "contains") {
//         aa[Op.substring] = value;
//       } else if (operation === "equals") {
//         aa[Op.eq] = value;
//       } else if (operation === "not_equals") {
//         aa[Op.ne] = value;
//       } else if (operation === "is_empty") {
//         aa[Op.is] = null;
//       } else if (operation === "is_not_empty") {
//         aa[Op.not] = null;
//       } else {
//         aa[Op.eq] = value;
//       }
//       return aa;
//     }, {});
//     a[key] = opDef;
//     return a;
//   }, {});
//   return where;
// }
