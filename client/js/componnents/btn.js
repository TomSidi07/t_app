import { component_render } from "../../render/render.js";
export default function button(content, classNames = ["btn"]) {
  return `<button class="${classNames.join(" ")}">${content}</button>`;
}
