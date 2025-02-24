import { component_render } from "../render/render.js";
export function link(href, content, classNames = ["link"]) {
  return `<a href="${href}" class="${classNames.join(" ")}">${content}</a>`;
}
