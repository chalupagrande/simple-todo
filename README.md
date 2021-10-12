# Etc Todo

A simple TODO app to demonstrate the following skills:

- Nextjs / React
- Apollo Client
- Apollo Server
- Sequelize
- AntD
- Auth0
- Recursion
- Database design
- PropTypes
- Design
- EsLint

### TODO:

- [x] understand the irony of writing a todo list in the readme of a todo app
- [x] Add list sharing
- [ ] ** NOTE! ** Recipes are different than lists with children ** Note **
- [ ] Add ability to copy one list into another - with timestamps OR without timestamps
- [ ] Add a "Mark all as DONE" functionality
- [ ] Add a "Mark all as UNDONE" functionality
- [ ] Add ability to add Recipes into other lists.
- [ ] Add due date
- [ ] Add guest mode
- [ ] Convert into Native app
- [ ] Dockerize and deploy
- [ ] Add deadline to lists (and a calendar of deadlines)
  - optional merge feature (detect items that have the same name (or similar names that are in another list))
- [ ] Lists that automatically detect when all of their children have been completed
  - (or get put in a STARTED state when one or more of the items have been started)
- [ ] Give a progress bar on how many of the items have been completed.
- [ ] Add tags to lits and filter in recipes Page
- [ ] Filters on the list
- [ ] Show and hide bulk options. Bulk Delete, Mark Done, Reset Last Status Update, etc...
- [ ] Show and hide sub-lists
- [ ] Make them draggable (to reorder)

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
        // where: { is_default: true },
        // include: [
        // {
        // where: { auth_id: user.sub },
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
- Prisma Bug
  - When running `npx prisma db pull`, it pulls in an error with the users table
  - ```
      model users {
      id         String       @id @db.Char(36) # THIS IS THE CORRECT WAY (pulls in as @db.VarChar(36))
      name       String       @db.VarChar(255)
      email      String       @unique @db.VarChar(255)
    ```
