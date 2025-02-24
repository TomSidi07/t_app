import { component_render } from "../../render/render.js";
import link from "../link.js";
import { blemcounter_component } from "../plugins/blem-couter.js";

export default function content_component(container) {
  let blems = [4];
  let blemCount = blems.length;
  return component_render(
    "app-content",
    `${blemcounter_component(blemCount)}
    ${link("/home", "go home")}
    `,
    () => {
      // connected callback
      console.log("I am content component");
    },
    container,
    false,
    { id: "Content" }
  );
}
