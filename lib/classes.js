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
  }
  /**
   *
   *
   * @param {http.IncomingMessage} req
   * @param {http.ServerResponse} res
   * @param {function} next
   * @memberof FST
   */
  serve = (req, res, next) => {
    const { url, method, headers } = req;
    let filepath = path.join(this.public_dir, url === "/" ? "index.html" : url);
    if (fs.existsSync(filepath)) {
      res.statusCode = 200;
      res.setHeader("Content-type", get_mimeType(filepath));
      const fileStream = fs.createReadStream(filepath);
      fileStream.on("open", () => {
        fileStream.pipe(res);
        return next();
      });
      fileStream.on("error", (err) => {
        console.log(error);
      });
      // res.end(fs.readFileSync(filepath));
      // return next();
      // res.end(filepath);
    }
    // res.end("Hoooo");
    // return next();
  };
}

module.exports = { FST };
