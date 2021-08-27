import { ApolloServer } from "apollo-server-micro";
import { schema } from "~/lib/apollo/schema";

let apolloServerHandler;

const getApolloServerHandler = async () => {
  if (!apolloServerHandler) {
    const server = new ApolloServer({ schema });
    await server.start();
    apolloServerHandler = await server.createHandler({
      path: "/api/graphql",
    });
  }
  return apolloServerHandler;
};

const handler = async (req, res) => {
  const apolloServerHandler = await getApolloServerHandler();
  return apolloServerHandler(req, res);
};

export default handler;

// const apolloServer = new ApolloServer({ schema })

export const config = {
  api: {
    bodyParser: false,
  },
};

// export default apolloServer.start().then(() => apolloServer.createHandler());
