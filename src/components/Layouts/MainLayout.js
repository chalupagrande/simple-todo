import React, { useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { CHECK_USER } from "~/lib/apollo/queries";
import Navigation from "~/components/Navigation";
import styles from "./styles.module.css";
import { useUser } from "@auth0/nextjs-auth0";

function Layout({ children }) {
  const { user } = useUser();
  const [checkUser, { loading, data, error }] = useLazyQuery(CHECK_USER);
  useEffect(() => {
    if (user) {
      console.log("CHECKING USER");
      checkUser({
        variables: {
          user: { ...user, auth0Id: user.sub },
        },
      });
    }
  }, [user]);

  return (
    <div className={styles.wrapper}>
      <Navigation />
      {children}
    </div>
  );
}

export default Layout;
