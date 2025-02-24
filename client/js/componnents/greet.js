import { component_render } from "../../render/render.js";
export default function greet_page(container) {
  let tag_name = "ct-btn";
  return component_render(
    tag_name,
    `
  <h1>T APP</h1>
  <h3>welcome</h3>`,
    () => {
      // connected callback
      console.log("I am btn component");
    },
    container,
    false,
    { class: ["container", "container--tp-greet"] }
  );
}
