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
  properties = {},
  options
) {
  let Prototype = HTMLElement;
  if (typeof container === "string") {
    container = document.querySelector(container);
    console.log("container", container);
  }
  if (options) {
    const { protoOf } = options;
    if (protoOf) {
      Prototype = protoOf;
    }
  }
  const element = definer(
    tag_name,
    class extends Prototype {
      constructor() {
        super();

        // this.attachShadow({ mode: "open" });
        this.innerHTML = initial_code;
      }
      connectedCallback() {
        if (properties) {
          const prop_keys = Object.keys(properties);
          for (let p = 0; p < prop_keys.length; p++) {
            let prop_key = prop_keys[p];
            let prop_val = properties[prop_key];
            if (Array.isArray(prop_val)) {
              this.setAttribute(prop_key, prop_val.join(" "));
            } else {
              this.setAttribute(prop_key, prop_val);
            }
          }
        }
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
  return element;
}
