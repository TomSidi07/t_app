import { component_render } from "../../render/render.js";
export function blemcounter_component(count) {
  let tag_name = "plugin-blemcounter";
  return component_render(
    tag_name,
    `
<div class="header__plugin">
  <h3>Total Blems</h3>
</div>
<div class="content__plugin">
  <span class="text text--bold text--large">${count}</span>
</div>`,
    () => {
      // connected callback
      console.log("I am plugin component");
    },
    null,
    false,
    { class: ["plugin", "plugin--blem-counter"] }
  );
}
