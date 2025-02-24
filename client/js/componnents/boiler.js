import { component_render } from "../../render/render.js";
export default function boiler(container) {
  let tag_name = "tag-name";
  return component_render(
    tag_name,
    `<p class="text text--medium">@mandefamily</p>`,
    () => {
      // connected callback
      console.log("I am content component");
    },
    container,
    false,
    { id: "ID", class: ["class1", "class2"] }
  );
}
