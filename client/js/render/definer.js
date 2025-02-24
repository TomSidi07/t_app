/**
 * @export function Definer defines web components and retrun their tag
 * @param {string} tag_name
 * @param {[]} classnames
 */
export function definer(tag_name, component) {
  if (!component.connectedCallback) {
    component.connectedCallback = () => {
      alert("set connected callback for component", tag_name);
    };
  }
  customElements.define(tag_name, component);
  const element = `<${tag_name}></${tag_name}>`;
  return element;
}
