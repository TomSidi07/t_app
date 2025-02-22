process.env.environnement = "development";
const http = require("http");
const URL = require("url");
const path_module = require("path");
const { handlePathSlash, getPathRegex } = require("../lib/functions");
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
    // console.log(current_chain);

    (function engine(CHAIN, actor, idx = -1) {
      const next_ = (error = null, cb = null) => {
        idx++;
        if (idx === CHAIN.length) {
          return res.end("CEST FINI");
        } else {
          const actor = CHAIN[idx];
          let cur_handlers;
          if (actor) {
            const [path, { path_confs, handlers }] = actor;
            const { atsKeys, paramsKeys, regex, at_regex } = path_confs;
           
            // console.log("path", URL.parse(path));
            // || url.match(regex)
            if (URL.parse(path).pathname === URL.parse(url).pathname) {
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
      // if (Array.isArray(CHAIN)) {
      //   return res.end("ARRAY STEP");
      // }
      // if (CHAIN instanceof Map) {
      //   actor = CHAIN.get(url);

      //   if (!actor) {
      //     return res.end("404: not found");
      //   }

      //   const next = (error = null) => {
      //     if (error) {
      //       console.log(error);
      //       return error;
      //     }
      //     const handler = actor[++idx];
      //     console.log(handler);
      //     if (handler) {
      //       return handler(req, res, next);
      //     } else {
      //       return res.end("404 not found");
      //     }
      //   };
      //   next();
      // }
    })(current_chain);
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
}
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
// console.log(MainChain);
server.listen(3000, () => {
  if (process.env.environnement.toLowerCase() === "development") {
    console.log("server running on http://localhost:3000");
  }
});
