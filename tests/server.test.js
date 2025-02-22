const server = new Router();
const app = new Application(server, MainChain);
const user_route = new Router.Extender("user");
server.get(
  "/",
  function midi(req, res, next) {
    console.log("&&&&&HELLO&&&&&");
    console.log(req.url);
    next();
  },
  (req, res) => {
    res.end("<h1>Hello Tommy</h1>");
  }
);
user_route.get("/profil", (req, res) => {
  res.end("USER PROFIL");
});
user_route.get("/:id/:name", (req, res) => {
  res.end(JSON.stringify(req.params));
});
server.get("/@username", (req, res) => {
  res.end(JSON.stringify(req.ats));
});
// console.log(MainChain);
server.listen(3000, () => {
  if (process.env.environnement.toLowerCase() === "development") {
    console.log("server running on http://localhost:3000");
  }
});
