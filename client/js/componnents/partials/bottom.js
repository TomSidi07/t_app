import { component_render } from "../../render/render.js";
export default function bottom_component(container) {
  return component_render(
    "app-bottom",
    `<p class="text text--medium">@mandefamily</p>`,
    () => {
      // connected callback
      console.log("I am content component");
    },
    container,
    false,
    { id: "Bottom" }
  );
}
