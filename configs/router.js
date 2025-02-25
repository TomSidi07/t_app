process.env.environnement = "development";
const http = require("http");
const URL = require("url");
const path_module = require("path");
const {
  handlePathSlash,
  getPathRegex,
  matchReqParams,
} = require("../lib/functions");
const { FST } = require("../lib/classes");
const MainChain = new Map();
class Router extends http.Server {
  constructor() {
    super();
    this.init(this);
  }
  /**
   * @param {http.Server} ctx
   * @memberof Router
   */
  init(ctx) {
    ctx.on("request", this.requester);
    return new Application(ctx, MainChain);
  }
  async run_adds(req, res, adds_array) {
    if (!adds_array.length) {
      return null;
    }
    let x = -1;
    const next = async () => {
      x++;
      if (x > adds_array) {
        return console.log("CHAIN DONE");
      } else {
        const actor = adds_array[x];
        if (typeof actor == "function") {
          return actor(req, res, next);
        } else if (Array.isArray(actor)) {
          return this.run_adds(req, res, adds_array);
        } else {
          return null;
        }
      }
    };
    await next();
  }
  /**
   * @param {http.IncomingMessage} req
   * @param {http.ServerResponse} res
   * @memberof Router
   */
  requester(req, res) {
    const { url, headers, method } = req;
    /** @type {Map|Array} */
    const current_chain = Array.from(MainChain.get(method));
    const adds_array = MainChain.get("adds");
    this.run_adds(req, res, adds_array)
      .then(() => {
        (function engine(CHAIN, idx = -1) {
          const next_ = (error = null, cb = null) => {
            idx++;
            if (idx >= CHAIN.length) {
              console.log("end");
              return res.end("404: not found");
            } else {
              const actor = CHAIN[idx];
              if (actor) {
                const [path, { path_confs, handlers }] = actor;
                const { atsKeys, paramsKeys, regex, at_regex } = path_confs;
                let params_match = url?.match(regex);
                let at_match = url.match(at_regex);
                // add request url params
                matchReqParams(req, paramsKeys, params_match, "params");
                // add request ats
                matchReqParams(req, atsKeys, at_match, "ats");

                if (
                  URL.parse(path).pathname === URL.parse(url).pathname ||
                  params_match ||
                  at_match
                ) {
                  let len = -1;
                  const next = (error = null, cb = null) => {
                    try {
                      if (error) {
                        return cb(req, res);
                      }
                      len++;
                      if (len >= handlers.length) {
                        return;
                      } else {
                        const func = handlers[len];
                        console.log("func", func);
                        if (func) {
                          return func(req, res, next);
                        }
                      }
                    } catch (error) {
                      console.log(error);
                      return cb(req, res);
                    }
                  };
                  next();
                } else {
                  return next_();
                }
              }
            }
          };
          next_();
        })(current_chain);
      })
      .catch((e) => {
        console.log(e);
      });
  }
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
    this.heart.add = this.#add;
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
    path = handlePathSlash(path);
    // console.log("path", path);
    path = this.basePath ? this.basePath.concat(path) : handlePathSlash(path);
    if (!this.baseChain.has(method)) {
      this.baseChain.set(method, new Map());
    }
    this.baseChain
      .get(method)
      .set(path, { path_confs: getPathRegex(path), handlers });
  }

  #get = (path, ...handlers) => {
    this.setMethod("GET", path, ...handlers);
  };
  #post = (path, ...handlers) => {
    this.setMethod("POST", path, ...handlers);
  };
  #add = (path, fn) => {
    if (!this.baseChain.has("adds")) {
      this.baseChain.set("adds", []);
    }
    if (typeof path == "function") {
      fn = path;
      this.baseChain.get("adds").push(fn);
    } else if (typeof path == "string" && typeof fn === "function") {
      this.baseChain.get("adds").push({ path, fn });
    }
  };
}
const server = new Router();
const public_dir = path_module.join(__dirname, "../client");

const file_server = new FST(public_dir);
file_server.connect(server);
const user_route = new Router.Extender("user");
// server.get(
//   "/",
//   function midi(req, res, next) {
//     console.log("&&&&&HELLO&&&&&");
//     console.log(req.url);
//     next();
//   },
//   (req, res) => {
//     res.end("<h1>Hello Tommy</h1>");
//   }
// );
// user_route.get("/profil", (req, res) => {
//   res.end("USER PROFIL");
// });
// user_route.get("/:id/:name", (req, res) => {
//   res.end(JSON.stringify(req.params));
// });
// server.get("/@username", (req, res) => {
//   res.end(JSON.stringify(req.ats));
// });
// console.log(MainChain);
server.listen(3000, () => {
  if (process.env.environnement.toLowerCase() === "development") {
    console.log("server running on http://localhost:3000");
  }
});
