import React from "react";
import User from "~/lib/db/models/UserModel";
import List from "~/lib/db/models/ListModel";
import db from "~/lib/db";

function TestPage() {
  return <h1>Something</h1>;
}

export const getServerSideProps = async () => {
  await db.sync();
  List.findAll();
};

export default TestPage;
