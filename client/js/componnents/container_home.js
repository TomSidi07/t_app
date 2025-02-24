import { component_render } from "../render/render.js";
import { link } from "./link.js";
import { blemcounter_component } from "./plugins/blem-couter.js";
export default function container_home_component(container) {
  let blems = [4];
  let blemCount = blems.length;
  let tag_name = "container-home";
  return component_render(
    tag_name,
    `${blemcounter_component(blemCount)}
    ${link("/home", "go home")}`,
    () => {
      // connected callback
      console.log("I am content component");
    },
    container,
    false,
    { class: ["container", "container--home"] }
  );
}
