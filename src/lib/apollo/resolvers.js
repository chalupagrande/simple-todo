import { v4 as uuid } from "uuid";
import { PrismaClient } from "@prisma/client";
import { mapIncludesToItems } from "~/lib/utils";
const prisma = new PrismaClient();

export const resolvers = {
  Query: {
    // Gets List owned by a User
    async list(_, { id, filter }) {
      let where;
      if (id) {
        where = { id };
      } else {
        where = filter;
      }

      try {
        const finalList = await prisma.lists.findFirst({
          where,
          include: {
            owners: {
              select: {
                users: true,
              },
            },
            children: {
              select: {
                child: true,
              },
            },
          },
        });
        finalList.owners = mapIncludesToItems(finalList.owners);
        finalList.children = mapIncludesToItems(finalList.children);
        return finalList;
      } catch (err) {
        console.log("ERROR", err.message);
      }
    },
    // get multiple lists
    /**
     *
     * NOT BEING USED
     *
     */
    async lists(_, { filter }) {
      try {
        const finalLists = await prisma.lists.findMany({
          where: filter || {},
          include: {
            owners: true,
          },
        });
        return { items: finalLists };
      } catch (err) {
        console.log("ERROR", err.message);
      }
    },

    async shared(_, { auth_id }) {
      const lists = await prisma.lists.findMany({
        where: filter,
      });
    },

    // creates User in DB
    async checkUser(_, { user }) {
      try {
        // creates the user if it wasn't already
        const userPayload = {
          id: user.sub,
          name: user.name,
          email: user.email,
        };

        const defaultListPayload = {
          id: uuid(),
          name: "Main",
          is_default: true,
          is_parent: true,
          owners: {
            create: {
              user_id: userPayload.id,
            },
          },
        };

        const createdUser = await prisma.users.upsert({
          where: {
            email: user.email,
          },
          create: {
            ...userPayload,
            lists_authored: {
              create: {
                ...defaultListPayload,
              },
            },
          },
          update: { updated_at: new Date() },
        });

        console.log("CREATED USER", createdUser);

        return { success: true };
      } catch (err) {
        console.log(err.message);
      }
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
        const newId = uuid();
        const finalList = await prisma.lists.create({
          data: {
            id: newId,
            ...data,
            author: user.sub,
            owners: {
              create: { user_id: user.sub },
            },
          },
        });

        const parent = await prisma.lists.update({
          where: { id: parentList.id },
          data: {
            is_parent: true,
          },
        });

        const relation = await prisma.list_lists.create({
          data: {
            child_id: newId,
            parent_id: parentList.id,
          },
        });

        return finalList;
      } catch (err) {
        console.error(err);
        throw Error(err);
      }
    },

    async updateList(_, { id, data }) {
      try {
        const list = prisma.lists.update({
          where: { id },
          data: { ...data, last_status_update: new Date() },
        });

        return list;
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
