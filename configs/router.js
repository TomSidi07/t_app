const http = require("http");
const path_module = require("path");
const { handlePathSlash } = require("../lib/functions");
const MainChain = new Map();
class Router extends http.Server {
  requester(req, res) {}
  static Extender = class {
    constructor(basePath) {
      this.basePath = basePath;
      this.app = new Application(this, MainChain, basePath);
    }
  };
}
class Application {
  heart = Object.create(null);
  /**
   * Creates an instance of Application.
   * @param {object} ctx
   * @param {Map} baseChain
   * @memberof Application
   */
  constructor(ctx, baseChain, basePath) {
    this.ctx = ctx;
    this.baseChain = baseChain;
    this.basePath = handlePathSlash(basePath) || null;
    this.init();
  }
  init() {
    if (!this.ctx || !this.baseChain) {
      const error = new Error("Missing Context | MainChain", {
        cause: "You must provide the context and the main chain",
      });
      console.error(error);
      return;
    }
    this.heart.get = this.#get;
    this.heart.post = this.#post;
    this.ctx.setMethod = this.setMethod;
    Object.assign(this.ctx, this.heart);
  }
  /**
   *
   *
   * @param {string} method
   * @param {string} path
   * @param {[fuction]} handlers
   * @memberof Application
   */
  setMethod(method, path, ...handlers) {
    path = this.basePath
      ? handlePathSlash(this.basePath.concat(path))
      : handlePathSlash(path);

    if (!this.baseChain.has(method)) {
      this.baseChain.set(method, new Map());
    }
    this.baseChain.get(method).set(path, handlers);
  }

  #get = (path, ...handlers) => {
    this.setMethod("GET", path, ...handlers);
  };
  #post = (path, ...handlers) => {
    this.setMethod("POST", path, ...handlers);
  };
}
const server = {};
const app = new Application(server, MainChain);
const user_route = new Router.Extender("user");
server.get("/root/", (req, res) => {
  console.log("Happy");
});
user_route.get("/profil", (req, res) => {});
console.log(MainChain);
