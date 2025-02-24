import { definer } from "./definer.js";

/**
 *
 *
 * @export
 * @param {string} tag_name
 * @param {string} initial_code
 * @param {Array} children
 * @param {HTMLElement} container
 * @param {function} cb
 */
export function component_render(
  tag_name,
  initial_code = "no iniatial code setted up",
  cb,
  container,
  clean_container = false,
  insert_index = 0,
  children
) {
  const element = definer(
    tag_name,
    class extends HTMLElement {
      constructor() {
        super();
        // this.attachShadow({ mode: "open" });
        this.innerHTML = initial_code;
      }
      connectedCallback() {
        console.log("happy");
        if (cb) cb();
      }
    }
  );
  if (clean_container && container) {
    container.innerHTML = ``;
  }
  if (container) {
    container.insertAdjacentHTML("afterbegin", element);
  }
}
