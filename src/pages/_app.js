import React, { useEffect } from "react";
import Head from "next/head";
import { UserProvider } from "@auth0/nextjs-auth0";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "~/lib/apollo/client";
import Layout from "~/components/Layouts/MainLayout";
import "antd/dist/antd.css";

export default function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <>
      <Head>
        <title>Todo</title>
        <meta name="description" content="Simple todo app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <UserProvider>
        <ApolloProvider client={apolloClient}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ApolloProvider>
      </UserProvider>
    </>
  );
}
