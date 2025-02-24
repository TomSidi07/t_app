import { component_render } from "../render/render.js";

import header_component from "./partials/header.js";
import main_component from "./partials/main.js";

export default function app_component(container) {
  let tag_name = "app-root";
  return component_render(
    tag_name,
    `${header_component(tag_name)}
      ${main_component(tag_name)}`,
    // connected callback
    () => {
      // console.log("I am app");
    },
    container,
    true,
    { id: "root" }
  );
}
