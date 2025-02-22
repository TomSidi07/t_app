module.exports = {
  /**
   * @param {string} path
   * @return {string|null}
   */
  handlePathSlash(path) {
    // abort the transformation
    if (!path || path === "/") return path;
    // replace repeated /
    path = path.replace(/[/][/]+/g, "/");
    //add / at first if no one
    path = path.startsWith("/") ? path : "/".concat(path);
    // remove the last /
    path = path.endsWith("/") && path !== "/" ? path.slice(0, -1) : path;
    return path;
  },
  getPathRegex(path) {
    let digest = { atsKeys: [], paramsKeys: [] };
    digest.regex = new RegExp(
      `${path.replace(/:([^/]+)/g, (m, v) => {
        digest.paramsKeys.push(v);
        return "([^/]+)";
      })}`
    );
    digest.at_regex = new RegExp(
      `${path.replace(/@([^/]+)/g, (m, v) => {
        digest.atsKeys.push(v);
        return "([^/]+)";
      })}`
    );
    return digest;
  },
};
