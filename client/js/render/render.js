import { definer } from "./definer";

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
  initial_code,
  cb,
  container,
  clean_container = false,
  children
) {
  const element = definer(
    tag_name,
    class extends HTMLElement {
      constructor() {
        super();
        this.shadowRoot = { open: true };
        this.shadowRoot.innerHTML = initial_code;
      }
      connectedCallback() {
        if (cb) cb();
      }
    }
  );
  if (clean_container && container) {
    container.innerHTML = ``;
  }
  if (container) {
    container.append(element);
  }
}
