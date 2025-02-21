module.exports = {
  /**
   *
   *
   * @param {string} path
   * @return {string|null}
   */
  handlePathSlash(path) {
    // abort the transformation
    if (!path) return null;
    // replace repeated /
    path = path === "/" ? path : path.replace(/[/][/]+/g, "/");
    //add / at first if no one
    path = path.startsWith("/") ? path : "/".concat(path);
    // remove the last /
    path = path.endsWith("/") ? path.slice(0, -1) : path;
    return path;
  },
};
