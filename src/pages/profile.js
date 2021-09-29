import React from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

function Profile({ user }) {
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
});

export default Profile;
