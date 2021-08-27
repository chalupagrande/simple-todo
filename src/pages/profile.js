import React from "react";
import { useQuery } from "@apollo/client";
import { Studies, ViewerQuery } from "~/lib/apollo/queries";
import { initializeApollo } from "~/lib/apollo/client";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

export default function Profile({ user, viewer }) {
  // const {loading, data, error} = useQuery(Studies)

  return user ? (
    <div>
      <img src={user.picture} alt={user.name} />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <a href="/api/auth/logout">Logout</a>
    </div>
  ) : (
    <p>No user present</p>
  );
}

export const getServerSideProps = withPageAuthRequired({
  returnTo: "/",
  async getServerSideProps(ctx) {
    const apolloClient = initializeApollo();
    await apolloClient.query({
      query: ViewerQuery,
    });

    const cache = apolloClient.cache.extract();

    return {
      props: {
        viewer: cache,
      },
    };
  },
});
