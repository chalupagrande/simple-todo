# Etc Todo

A simple TODO app to demonstrate the following skills:

- Nextjs / React
- Apollo Client
- Apollo Server
- Mongo DB
- AntD
- Auth0

### Bug References:

- Getting `user` in `getServerSideProps`:
  - [Solution](https://github.com/auth0/nextjs-auth0/issues/368#issuecomment-820787744)
  - However:
    ```
    /**
      * Using getServerSideProps doesn't make much sense here. The reason you would
      * typically use `getServerSideProps` is to benefit from web-crawlers for SEO reasons.
      * Considering the content being loaded is strictly for the logged in users use, there
      * is no reason to allow web-crawlers to access it. Thus we are going to stick
      * to Client-Side-Rendering instead.
      *
      * WE CAN however use it to get the user session and block un-authed traffic to this page.
      *
      * Leaving this example here because it is helpful to know how to get a users ID in the
      * getServerSideProps function
      **/
        // async getServerSideProps(ctx) {
        // console.log("RUNNING QUERY");
        // await db.sync();
        // // get user
        // const { req, res } = ctx;
        // const { user } = getSession(req, res);
        // const defaultList = await List.findOne({
        // where: { isDefault: true },
        // include: [
        // {
        // where: { auth0Id: user.sub },
        // model: User,
        // },
        // ],
        // });
        // // get users lists
        // let lists = await defaultList.getChildren();
        // return {
        // props: { listName: "Main", lists: JSON.parse(safeJsonStringify(lists)) },
        // };
        // },
    ```
