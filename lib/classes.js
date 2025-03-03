const http = require("http");
const path = require("path");
const fs = require("fs");
const { error } = require("console");
const { get_mimeType } = require("./functions");

class FST {
  constructor(public_dir) {
    this.public_dir = public_dir;
  }
  connect(app) {
    app.add(this.serve);
    console.log("fst connect");
  }
  /**
   *
   *
   * @param {http.IncomingMessage} req
   * @param {http.ServerResponse} res
   * @param {function} next
   * @memberof FST
   */
  serve = async (req, res, next) => {
    return new Promise((resolve, reject) => {
      const { url, method, headers } = req;
      let filepath = path.join(
        this.public_dir,
        url === "/" ? "index.html" : url
      );
      console.log('"FST"', "FST");
      if (fs.existsSync(filepath)) {
        res.statusCode = 200;
        res.setHeader("Content-type", get_mimeType(filepath));
        const stream = fs.createReadStream(filepath, { highWaterMark: 32000 });
        stream.on("open", () => {
          stream.pipe(res);
        });
        stream.on("end", () => {
          resolve(next());
        });
        stream.on("error", (e) => {
          reject(e);
        });
      }
      // reject();
      // res.end("Hoooo");
      return next();
    });
  };
}

module.exports = { FST };
