import { component_render } from "../../render/render.js";
import bottom_component from "./bottom.js";
import content_component from "./content.js";

export default function main_component(container) {
  return component_render(
    "app-main",
    `${content_component()}
    ${bottom_component()}
    `,
    () => {
      // connected callback
      console.log("I am main component");
    },
    container,
    false,
    { id: "Main" }
  );
}
